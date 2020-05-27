package mock

import (
	"context"
	"mime/multipart"

	"github.com/threeaccents/mahi"
)

type UploadService struct {
}

func (s *UploadService) Upload(ctx context.Context, r *multipart.Reader) (*mahi.File, error) {
	return nil, nil
}

func (s *UploadService) ChunkUpload(ctx context.Context, r *multipart.Reader) error {
	return nil
}

func (s *UploadService) CompleteChunkUpload(ctx context.Context, appID, uploadID, filename string) (*mahi.File, error) {
	return nil, nil
}
