package mock

import (
	"context"
	"time"

	uuid "github.com/satori/go.uuid"

	"github.com/threeaccents/mahi"
)

type ApplicationService struct {
}

func (s *ApplicationService) Create(ctx context.Context, n *mahi.NewApplication) (*mahi.Application, error) {
	return &mahi.Application{
		ID:               uuid.NewV4().String(),
		Name:             n.Name,
		Description:      n.Description,
		StorageRegion:    n.StorageRegion,
		StorageEndpoint:  "mock endpoint",
		StorageEngine:    n.StorageEngine,
		StorageBucket:    "mock bucket",
		StorageAccessKey: n.StorageAccessKey,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}, nil
}

func (s *ApplicationService) Application(ctx context.Context, id string) (*mahi.Application, error) {
	return &mahi.Application{}, nil
}

func (s *ApplicationService) Applications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	return []*mahi.Application{}, nil
}

func (s *ApplicationService) Delete(ctx context.Context, id string) error {
	return nil
}

func (s *ApplicationService) Update(ctx context.Context, u *mahi.UpdateApplication) (*mahi.Application, error) {
	return &mahi.Application{}, nil
}

func (s *ApplicationService) FileBlobStorage(engine, accessKey, secretKey, region, endpoint string) (mahi.FileBlobStorage, error) {
	return &FileBlobStorage{}, nil
}
