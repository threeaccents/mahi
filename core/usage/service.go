package usage

import (
	"time"

	"github.com/threeaccents/mahi"
)

type Service struct {
	UsageStorage mahi.UsageStorage
}

func (s *Service) Usages(startTime, endTime time.Time) ([]*mahi.Usage, error) {
	return s.UsageStorage.Usages(startTime, endTime)
}

func (s *Service) ApplicationUsages(applicationID string, startTime, endTime time.Time) ([]*mahi.Usage, error) {
	return s.UsageStorage.ApplicationUsages(applicationID, startTime, endTime)
}
