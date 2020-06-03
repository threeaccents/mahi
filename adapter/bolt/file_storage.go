package bolt

import (
	"context"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type FileStorage struct {
	DB *storm.DB
}

func (s *FileStorage) Store(ctx context.Context, n *mahi.NewFile) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) File(ctx context.Context, id string) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) FileByFileBlobID(ctx context.Context, fileBlobID string) (*mahi.File, error) {
	return nil, nil
}

func (s FileStorage) ApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	return nil, nil
}

func (s FileStorage) applicationFiles(ctx context.Context, applicationID string, limit int) ([]*mahi.File, error) {
	return nil, nil
}

func (s FileStorage) paginateApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) Delete(ctx context.Context, id string) error {
	return nil
}
