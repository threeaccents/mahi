package mahi

import "net/http"

type UploadService interface {
	Upload(r *http.Request) (*File, error)
	ChunkUpload(r *http.Request) error
	CompleteChunkUpload(c *CompletedChunkUpload) (*File, error)
}

type CompletedChunkUpload struct {
	UploadID      string
	ApplicationID string
	Filename      string
}
