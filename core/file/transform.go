package file

import (
	"context"

	"github.com/threeaccents/mahi"
)

type TransformService struct {
	MaxTransformFileSize int64
}

func (s *TransformService) Transform(ctx context.Context, file *mahi.File, blob *mahi.FileBlob, opts *mahi.TransformationOption) (*mahi.FileBlob, error) {
	if !file.IsTransformable() {
		return blob, nil
	}

	if file.Size > s.MaxTransformFileSize {
		return nil, mahi.ErrFileToLargeToTransform
	}

	return blob, nil
}
