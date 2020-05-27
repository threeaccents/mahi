package application

import (
	"context"
	"fmt"

	"github.com/threeaccents/mahi"
)

type Service struct {
	ApplicationStorage mahi.ApplicationStorage

	EncryptionService mahi.EncryptionService
}

func (s *Service) Create(ctx context.Context, n *mahi.NewApplication) (*mahi.Application, error) {
	cipherStorageSecretKey, err := s.EncryptionService.EncryptToString([]byte(n.StorageSecretKey))
	if err != nil {
		return nil, fmt.Errorf("failed enrcypting secret key %w", err)
	}

	n.StorageSecretKey = cipherStorageSecretKey

	if n.StorageEndpoint == "" {
		n.StorageEndpoint = makeStorageEndpoint(n.StorageEngine, n.StorageRegion)
	}

	if n.StorageBucket == "" {
		n.StorageBucket = makeStorageBucketName(n.Name)
	}

	if err := s.createStorageBucket(ctx, n); err != nil {
		return nil, fmt.Errorf("failed creating bucket %w", err)
	}

	return s.ApplicationStorage.Store(ctx, n)
}

func (s *Service) Application(ctx context.Context, id string) (*mahi.Application, error) {
	return s.ApplicationStorage.Application(ctx, id)
}

func (s *Service) Applications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	if limit == 0 {
		limit = mahi.DefaultFilePaginationLimit
	}

	return s.ApplicationStorage.Applications(ctx, sinceID, limit)
}

func (s *Service) Delete(ctx context.Context, id string) error {
	return s.ApplicationStorage.Delete(ctx, id)
}

func (s *Service) Update(ctx context.Context, u *mahi.UpdateApplication) (*mahi.Application, error) {
	return s.ApplicationStorage.Update(ctx, u)
}
