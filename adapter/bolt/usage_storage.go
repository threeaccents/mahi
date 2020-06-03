package bolt

import (
	"context"
	"time"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type UsageStorage struct {
	DB *storm.DB
}

func (s *UsageStorage) Store(ctx context.Context, n *mahi.NewUsage) (*mahi.Usage, error) {
	return nil, nil
}

func (s *UsageStorage) Update(ctx context.Context, u *mahi.UpdateUsage) (*mahi.Usage, error) {
	return nil, nil
}

func (s *UsageStorage) Usage(ctx context.Context, applicationID string, start, end time.Time) (*mahi.Usage, error) {
	return nil, nil
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
