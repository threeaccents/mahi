package mahi

import "net/http"

type UploadService interface {
	Upload(r *http.Request) (*File, error)
	ChunkUpload(r *http.Request) error
	CompleteChunkUpload(uploadID, filename string) (*File, error)
}
