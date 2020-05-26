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
