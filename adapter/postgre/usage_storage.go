package postgre

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/jinzhu/now"
	"github.com/threeaccents/mahi"
)

type usage struct {
	ID                    string
	ApplicationID         string
	Transformations       int64
	UniqueTransformations int64
	Bandwidth             int64
	Storage               int64
	FileCount             int64
	StartDate             time.Time
	EndDate               time.Time
	CreatedAt             time.Time
	UpdatedAt             time.Time
}

type UsageStorage struct {
	DB *pgxpool.Pool
}

func (s *UsageStorage) Store(ctx context.Context, n *mahi.NewUsage) (*mahi.Usage, error) {
	if n.StartDate.Format("01/02/2006") == n.EndDate.Format("01/02/2006") {
		return nil, errors.New("start and end times cannot be the same")
	}

	var u usage

	query := `
		INSERT INTO mahi_usages (application_id, transformations, unique_transformations, bandwidth, storage, file_count, start_date, end_date)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
		RETURNING id, application_id, transformations, unique_transformations, bandwidth, storage, file_count, 
										start_date, end_date, created_at, updated_at
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(n.ApplicationID),
		n.Transformations,
		n.UniqueTransformations,
		n.Bandwidth,
		n.Storage,
		n.FileCount,
		NewNullTime(n.StartDate),
		NewNullTime(n.EndDate),
	).Scan(
		&u.ID,
		&u.ApplicationID,
		&u.Transformations,
		&u.UniqueTransformations,
		&u.Bandwidth,
		&u.Storage,
		&u.FileCount,
		&u.StartDate,
		&u.EndDate,
		&u.CreatedAt,
		&u.UpdatedAt,
	); err != nil {
		return nil, err
	}

	mahiUsage := sanitizeUsage(u)

	return &mahiUsage, nil
}

func (s *UsageStorage) Update(ctx context.Context, u *mahi.UpdateUsage) (*mahi.Usage, error) {
	start := now.BeginningOfDay()
	if u.StartDate != (time.Time{}) {
		start = now.New(u.StartDate).BeginningOfDay()
	}

	end := now.BeginningOfDay().Add(25 * time.Hour)
	if u.EndDate != (time.Time{}) {
		end = now.New(u.EndDate).EndOfDay()
	}

	if start.Format("01/02/2006") == end.Format("01/02/2006") {
		return nil, errors.New("start and end times cannot be the same")
	}

	usage, err := s.Usage(ctx, u.ApplicationID, start, end)
	if err != nil && err != mahi.ErrUsageNotFound {
		return nil, err
	}

	// first entry of the day
	if err != nil && err == mahi.ErrUsageNotFound {
		latestUsage, err := s.lastApplicationUsage(ctx, u.ApplicationID)
		if err != nil && err != mahi.ErrUsageNotFound {
			return nil, err
		}

		// these items get rolled over they don't reset per day
		storage := latestUsage.Storage + u.Storage
		fileCount := latestUsage.FileCount + u.FileCount

		newUsage := &mahi.NewUsage{
			ApplicationID:         u.ApplicationID,
			Transformations:       u.Transformations,
			UniqueTransformations: u.UniqueTransformations,
			Bandwidth:             u.Bandwidth,
			Storage:               storage,
			FileCount:             fileCount,
			StartDate:             start,
			EndDate:               end,
		}

		return s.Store(ctx, newUsage)
	}

	updatedUsage := &mahi.UpdateUsage{
		ApplicationID:         u.ApplicationID,
		Transformations:       usage.Transformations + u.Transformations,
		UniqueTransformations: usage.UniqueTransformations + u.UniqueTransformations,
		Bandwidth:             usage.Bandwidth + u.Bandwidth,
		Storage:               usage.Storage + u.Storage,
		FileCount:             usage.FileCount + u.FileCount,
		StartDate:             start,
		EndDate:               end,
	}

	return s.update(ctx, usage.ID, updatedUsage)
}

func (s *UsageStorage) Usage(ctx context.Context, applicationID string, start, end time.Time) (*mahi.Usage, error) {
	var u usage

	query := `
		SELECT id, application_id, transformations, unique_transformations, bandwidth, storage, file_count, start_date, end_date,
									    created_at, updated_at 
		FROM mahi_usages
		WHERE application_id = $1
		AND start_date >= $2
		AND end_date <= $3
		LIMIT 1

 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(applicationID),
		NewNullTime(start),
		NewNullTime(end),
	).Scan(
		&u.ID,
		&u.ApplicationID,
		&u.Transformations,
		&u.UniqueTransformations,
		&u.Bandwidth,
		&u.Storage,
		&u.FileCount,
		&u.StartDate,
		&u.EndDate,
		&u.CreatedAt,
		&u.UpdatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
			return nil, mahi.ErrUsageNotFound
		}
		return nil, err
	}

	mahiUsage := sanitizeUsage(u)

	return &mahiUsage, nil
}

func (s *UsageStorage) ApplicationUsages(ctx context.Context, applicationID string, start, end time.Time) ([]*mahi.Usage, error) {
	var usages []*mahi.Usage

	query := `
		SELECT id, application_id, transformations, unique_transformations, bandwidth, storage, file_count, start_date, end_date,
									    created_at, updated_at 
		FROM mahi_usages
		WHERE application_id = $1
		AND start_date >= $2
		AND end_date <= $3
		ORDER BY start_date ASC
 `

	rows, err := s.DB.Query(
		ctx,
		query,
		NewNullString(applicationID),
		NewNullTime(start),
		NewNullTime(end),
	)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var u usage
		if err := rows.Scan(
			&u.ID,
			&u.ApplicationID,
			&u.Transformations,
			&u.UniqueTransformations,
			&u.Bandwidth,
			&u.Storage,
			&u.FileCount,
			&u.StartDate,
			&u.EndDate,
			&u.CreatedAt,
			&u.UpdatedAt,
		); err != nil {
			return nil, err
		}

		sanitizeUsage := sanitizeUsage(u)

		usages = append(usages, &sanitizeUsage)
	}

	if rows.Err() != nil {
		return nil, err
	}

	return usages, nil
}

func (s *UsageStorage) Usages(ctx context.Context, start, end time.Time) ([]*mahi.TotalUsage, error) {
	var usages []*mahi.TotalUsage

	query := `
		SELECT SUM(transformations)  AS transformations,
			SUM(unique_transformations)  AS unique_transformations,
		   SUM(bandwidth)        AS bandwidth,
		   SUM(storage)          AS storage,
		   SUM(file_count)       AS file_count,
		   start_date,
		   end_date
		FROM mahi_usages
		WHERE start_date >= $1
		  AND end_date <= $2
		GROUP BY start_date, end_date
		ORDER BY start_date ASC
 `

	rows, err := s.DB.Query(
		ctx,
		query,
		NewNullTime(start),
		NewNullTime(end),
	)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var u usage
		if err := rows.Scan(
			&u.Transformations,
			&u.UniqueTransformations,
			&u.Bandwidth,
			&u.Storage,
			&u.FileCount,
			&u.StartDate,
			&u.EndDate,
		); err != nil {
			return nil, err
		}

		sanitizeUsage := sanitizeTotalUsage(u)

		usages = append(usages, &sanitizeUsage)
	}

	if rows.Err() != nil {
		return nil, err
	}

	return usages, nil
}

func (s *UsageStorage) update(ctx context.Context, id string, updatedUsage *mahi.UpdateUsage) (*mahi.Usage, error) {
	var u usage

	query := `
		UPDATE mahi_usages
		SET transformations        = $1,
			unique_transformations = $2,
			bandwidth              = $3,
			storage                = $4,
			file_count             = $5
		WHERE id = $6
		RETURNING id, application_id, transformations, unique_transformations, bandwidth, storage, file_count, 
										start_date, end_date, created_at, updated_at
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		updatedUsage.Transformations,
		updatedUsage.UniqueTransformations,
		updatedUsage.Bandwidth,
		updatedUsage.Storage,
		updatedUsage.FileCount,
		NewNullString(id),
	).Scan(
		&u.ID,
		&u.ApplicationID,
		&u.Transformations,
		&u.UniqueTransformations,
		&u.Bandwidth,
		&u.Storage,
		&u.FileCount,
		&u.StartDate,
		&u.EndDate,
		&u.CreatedAt,
		&u.UpdatedAt,
	); err != nil {
		return nil, err
	}

	mahiUsage := sanitizeUsage(u)

	return &mahiUsage, nil
}

func (s *UsageStorage) lastApplicationUsage(ctx context.Context, applicationID string) (mahi.Usage, error) {
	var u usage

	query := `
		SELECT id, application_id, transformations, unique_transformations, bandwidth, storage, file_count, start_date, end_date,
									    created_at, updated_at 
		FROM mahi_usages
		WHERE application_id = $1
		ORDER BY created_at DESC
		LIMIT 1
 `
	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(applicationID),
	).Scan(
		&u.ID,
		&u.ApplicationID,
		&u.Transformations,
		&u.UniqueTransformations,
		&u.Bandwidth,
		&u.Storage,
		&u.FileCount,
		&u.StartDate,
		&u.EndDate,
		&u.CreatedAt,
		&u.UpdatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
			return mahi.Usage{}, mahi.ErrUsageNotFound
		}
		return mahi.Usage{}, err
	}

	mahiUsage := sanitizeUsage(u)

	return mahiUsage, nil
}

func sanitizeUsage(u usage) mahi.Usage {
	return mahi.Usage{
		ID:                    u.ID,
		ApplicationID:         u.ApplicationID,
		Transformations:       u.Transformations,
		UniqueTransformations: u.UniqueTransformations,
		Bandwidth:             u.Bandwidth,
		Storage:               u.Storage,
		FileCount:             u.FileCount,
		StartDate:             u.StartDate,
		EndDate:               u.EndDate,
		CreatedAt:             u.CreatedAt,
		UpdatedAt:             u.UpdatedAt,
	}
}

func sanitizeTotalUsage(u usage) mahi.TotalUsage {
	return mahi.TotalUsage{
		Transformations:       u.Transformations,
		UniqueTransformations: u.UniqueTransformations,
		Bandwidth:             u.Bandwidth,
		Storage:               u.Storage,
		FileCount:             u.FileCount,
		StartDate:             u.StartDate,
		EndDate:               u.EndDate,
	}
}
