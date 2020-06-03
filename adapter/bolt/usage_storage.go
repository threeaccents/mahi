package bolt

import (
	"context"
	"errors"
	"time"

	"github.com/asdine/storm/v3/q"

	"github.com/jinzhu/now"

	uuid "github.com/satori/go.uuid"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type usage struct {
	Pk                    int    `storm:"id,increment"`
	ID                    string `storm:"index"`
	ApplicationID         string `storm:"index"`
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
	DB *storm.DB
}

func (s *UsageStorage) Store(ctx context.Context, n *mahi.NewUsage) (*mahi.Usage, error) {
	if n.StartDate.Format("01/02/2006") == n.EndDate.Format("01/02/2006") {
		return nil, errors.New("start and end times cannot be the same")
	}

	u := usage{
		ID:                    uuid.NewV4().String(),
		ApplicationID:         n.ApplicationID,
		Transformations:       n.Transformations,
		UniqueTransformations: n.UniqueTransformations,
		Bandwidth:             n.Bandwidth,
		Storage:               n.Storage,
		FileCount:             n.FileCount,
		StartDate:             n.StartDate,
		EndDate:               n.EndDate,
		CreatedAt:             time.Now(),
		UpdatedAt:             time.Now(),
	}

	if err := s.DB.Save(&u); err != nil {
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

	return usage, nil
}

func (s *UsageStorage) Usage(ctx context.Context, applicationID string, start, end time.Time) (*mahi.Usage, error) {
	var u usage
	if err := s.DB.Select(q.Eq("ApplicationID", applicationID), q.Gte("StartDate", start), q.Lte("EndData", end)).First(&u); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrUsageNotFound
		}
		return nil, err
	}

	mahiUsage := sanitizeUsage(u)

	return &mahiUsage, nil
}

func (s *UsageStorage) ApplicationUsages(ctx context.Context, applicationID string, start, end time.Time) ([]*mahi.Usage, error) {
	return nil, nil
}

func (s *UsageStorage) Usages(ctx context.Context, start, end time.Time) ([]*mahi.TotalUsage, error) {
	return nil, nil
}

func (s *UsageStorage) update(ctx context.Context, id string, updatedUsage *mahi.UpdateUsage) (*mahi.Usage, error) {
	return nil, nil
}

func (s *UsageStorage) lastApplicationUsage(ctx context.Context, applicationID string) (mahi.Usage, error) {
	return mahi.Usage{}, nil
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
