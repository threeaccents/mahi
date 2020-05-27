package upload

import (
	"context"
	"mime/multipart"

	"github.com/threeaccents/mahi"
)

func (s *Service) Upload(ctx context.Context, r *multipart.Reader) (*mahi.File, error) {
	return nil, nil
}
