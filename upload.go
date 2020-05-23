package mahi

import (
	"mime/multipart"
)

type UploadService interface {
	Upload(r *multipart.Reader) (*File, error)
	ChunkUpload(r *multipart.Reader) error
	CompleteChunkUpload(uploadID, filename string) (*File, error)
}
