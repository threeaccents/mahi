package mahi

import (
	"context"
	"mime/multipart"
)

type UploadService interface {
	Upload(ctx context.Context, r *multipart.Reader) (*File, error)
	ChunkUpload(ctx context.Context, r *multipart.Reader) error
	CompleteChunkUpload(ctx context.Context, applicationID, uploadID, filename string) (*File, error)
}
