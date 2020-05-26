package mock

import (
	"context"

	"github.com/threeaccents/mahi"
)

type FileService struct {
}

func (s *FileService) Create(ctx context.Context, n *mahi.NewFile) (*mahi.File, error) {
	return &mahi.File{}, nil
}

func (s *FileService) File(ctx context.Context, id string) (*mahi.File, error) {
	return &mahi.File{}, nil
}

func (s *FileService) ApplicationFiles(ctx context.Context, appID, sinceID string, limit int) ([]*mahi.File, error) {
	return []*mahi.File{}, nil
}

func (s *FileService) Delete(ctx context.Context, id string) error {
	return nil
}
