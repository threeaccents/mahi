package usage

import (
	"context"

	"github.com/threeaccents/mahi"
)

type Service struct {
	UsageStorage mahi.UsageStorage
}

func (s *Service) Update(ctx context.Context, u *mahi.UpdateUsage) error {
	if _, err := s.UsageStorage.Update(ctx, u); err != nil {
		return err
	}

	return nil
}

//func (s *Service) Usages(ctx context.Context, startTime, endTime time.Time) ([]*mahi.Usage, error) {
//	return s.UsageStorage.Usages(ctx, startTime, endTime)
//}
//
//func (s *Service) ApplicationUsages(ctx context.Context, applicationID string, startTime, endTime time.Time) ([]*mahi.Usage, error) {
//	return s.UsageStorage.ApplicationUsages(ctx, applicationID, startTime, endTime)
//}
