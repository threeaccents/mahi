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
	ID              string
	ApplicationID   string
	Transformations int64
	Bandwidth       int64
	Storage         int64
	FileCount       int64
	StartDate       time.Time
	EndDate         time.Time
	CreatedAt       time.Time
	UpdatedAt       time.Time
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
		INSERT INTO mahi_usages (application_id, transformations,bandwidth, storage, file_count, start_date, end_date)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id, application_id, transformations, bandwidth, storage, file_count, 
										start_date, end_date, created_at, updated_at
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(n.ApplicationID),
		NewNullInt64(n.Transformations),
		NewNullInt64(n.Bandwidth),
		NewNullInt64(n.Storage),
		NewNullInt64(n.FileCount),
		NewNullTime(n.StartDate),
		NewNullTime(n.EndDate),
	).Scan(
		&u.ID,
		&u.ApplicationID,
		&u.Transformations,
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

func (s *UsageStorage) Update(ctx context.Context, u *mahi.UpdateUsage) error {
	start := now.BeginningOfDay()
	if u.StartDate != (time.Time{}) {
		start = now.New(u.StartDate).BeginningOfDay()
	}

	end := now.EndOfDay()
	if u.EndDate != (time.Time{}) {
		end = now.New(u.EndDate).EndOfDay()
	}

	if start.Format("01/02/2006") == end.Format("01/02/2006") {
		return errors.New("start and end times cannot be the same")
	}

	usage, err := s.Usage(ctx, u.ApplicationID, start, end)
	if err != nil && err != mahi.ErrUsageNotFound {
		return err
	}

	// first entry of the day
	if err != nil && err == mahi.ErrUsageNotFound {
		latestUsage, err := s.lastApplicationUsage(ctx, u.ApplicationID)
		if err != nil && err != mahi.ErrUsageNotFound {
			return err
		}

		// these items get rolled over they don't reset
		storage := latestUsage.Storage + u.Storage
		fileCount := latestUsage.FileCount + u.FileCount

		newUsage := &mahi.NewUsage{
			ApplicationID:   u.ApplicationID,
			Transformations: u.Transformations,
			Bandwidth:       u.Bandwidth,
			Storage:         storage,
			FileCount:       fileCount,
			StartDate:       u.StartDate,
			EndDate:         u.EndDate,
		}

		if _, err := s.Store(ctx, newUsage); err != nil {
			return err
		}

		return nil
	}

	updatedUsage := &mahi.UpdateUsage{
		ApplicationID:   u.ApplicationID,
		Transformations: usage.Transformations + u.Transformations,
		Bandwidth:       usage.Bandwidth + u.Bandwidth,
		Storage:         usage.Transformations + u.Storage,
		FileCount:       usage.Transformations + u.FileCount,
		StartDate:       u.StartDate,
		EndDate:         u.EndDate,
	}

	return s.update(ctx, usage.ID, updatedUsage)
}

func (s *UsageStorage) update(ctx context.Context, id string, u *mahi.UpdateUsage) error {
	query := `
		UPDATE mahi_usages
		SET transformations = $1,
			bandwidth       = $2,
			storage         = $3,
			file_count      = $4
		WHERE id = $5
 `

	if _, err := s.DB.Exec(
		ctx,
		query,
		NewNullInt64(u.Transformations),
		NewNullInt64(u.Bandwidth),
		NewNullInt64(u.Storage),
		NewNullInt64(u.FileCount),
		NewNullString(id),
	); err != nil {
		return err
	}

	return nil
}

func (s *UsageStorage) Usage(ctx context.Context, applicationID string, start, end time.Time) (*mahi.Usage, error) {
	var u usage

	query := `
		Select id, application_id, transformations, bandwidth, storage, file_count, start_date, end_date,
									    created_at, updated_at 
		FROM mahi_usages
		WHERE application_id = $1
		AND start >= $2
		AND end <= $3
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

func (s *UsageStorage) lastApplicationUsage(ctx context.Context, applicationID string) (mahi.Usage, error) {
	var u usage

	query := `
		Select id, application_id, transformations, bandwidth, storage, file_count, start, end,
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
		ID:              u.ID,
		ApplicationID:   u.ApplicationID,
		Transformations: u.Transformations,
		Bandwidth:       u.Bandwidth,
		Storage:         u.Storage,
		FileCount:       u.FileCount,
		StartDate:       u.StartDate,
		EndDate:         u.EndDate,
		CreatedAt:       u.CreatedAt,
		UpdatedAt:       u.UpdatedAt,
	}
}
