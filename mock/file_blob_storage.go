package mock

import (
	"context"

	"github.com/threeaccents/mahi"
)

type FileBlobStorage struct {
}

func (s *FileBlobStorage) Upload(ctx context.Context, bucket string, blob *mahi.FileBlob) error {
	return nil
}

func (s *FileBlobStorage) CreateBucket(ctx context.Context, bucket string) error {
	return nil
}

func (s *FileBlobStorage) FileBlob(ctx context.Context, bucket, id, tempDir string) (*mahi.FileBlob, error) {
	return &mahi.FileBlob{}, nil
}
