package bolt

import (
	"context"
	"errors"
	"fmt"
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
		return nil, fmt.Errorf("failed getting usage %w", err)
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
	if err := s.DB.Select(q.Eq("ApplicationID", applicationID), q.Gte("StartDate", start), q.Lte("EndDate", end)).First(&u); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrUsageNotFound
		}
		return nil, err
	}

	mahiUsage := sanitizeUsage(u)

	return &mahiUsage, nil
}

func (s *UsageStorage) boltUsage(ctx context.Context, id string) (*usage, error) {
	var u usage
	if err := s.DB.Select(q.Eq("ID", id)).First(&u); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrUsageNotFound
		}
		return nil, err
	}

	return &u, nil
}

func (s *UsageStorage) ApplicationUsages(ctx context.Context, applicationID string, start, end time.Time) ([]*mahi.Usage, error) {
	var usages []*usage
	if err := s.DB.Select(q.Eq("ApplicationID", applicationID), q.Gte("StartDate", start), q.Lte("EndDate", end)).OrderBy("StartDate").Find(&usages); err != nil {
		if err == storm.ErrNotFound {
			return []*mahi.Usage{}, nil
		}
		return nil, err
	}

	var mahiUsages []*mahi.Usage

	for _, u := range usages {
		mahiUsage := sanitizeUsage(*u)

		mahiUsages = append(mahiUsages, &mahiUsage)
	}

	return mahiUsages, nil
}

func (s *UsageStorage) Usages(ctx context.Context, start, end time.Time) ([]*mahi.TotalUsage, error) {
	var usages []*usage
	if err := s.DB.Select(q.Gte("StartDate", start), q.Lte("EndDate", end)).OrderBy("StartDate").Find(&usages); err != nil {
		if err == storm.ErrNotFound {
			return []*mahi.TotalUsage{}, nil
		}
		return nil, err
	}

	var mahiTotalUsages []*mahi.TotalUsage

	for _, u := range usages {
		mahiUsage := sanitizeTotalUsage(*u)

		mahiTotalUsages = append(mahiTotalUsages, &mahiUsage)
	}

	return mahiTotalUsages, nil
}

func (s *UsageStorage) update(ctx context.Context, id string, updatedUsage *mahi.UpdateUsage) (*mahi.Usage, error) {
	u, err := s.boltUsage(ctx, id)
	if err != nil {
		return nil, fmt.Errorf("failed getting bolt usage %w", err)
	}

	u.Transformations = updatedUsage.Transformations
	u.UniqueTransformations = updatedUsage.UniqueTransformations
	u.Bandwidth = updatedUsage.Bandwidth
	u.Storage = updatedUsage.Storage
	u.FileCount = updatedUsage.FileCount
	u.UpdatedAt = time.Now()

	if err := s.DB.Save(u); err != nil {
		return nil, err
	}

	mahiUsage := sanitizeUsage(*u)

	return &mahiUsage, nil
}

func (s *UsageStorage) lastApplicationUsage(ctx context.Context, applicationID string) (mahi.Usage, error) {
	var u usage
	if err := s.DB.Select(q.Eq("ApplicationID", applicationID)).OrderBy("StartDate").Reverse().First(&u); err != nil {
		if err == storm.ErrNotFound {
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
