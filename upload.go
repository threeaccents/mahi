package mahi

import (
	"io"
	"mime/multipart"
)

type UploadService interface {
	Upload(r *multipart.Reader) (*File, error)
	ChunkUpload(r *multipart.Reader) error
	CompleteChunkUpload(uploadID, filename string) (*File, error)
}

// Chunk is a chunk of a file.
// It contains information to be able to put the full file back together
// when all file chunks have been uploaded.
type Chunk struct {
	UploadID      string
	ChunkNumber   int32
	TotalChunks   int32
	TotalFileSize int64
	Filename      string
	Data          io.Reader
	UploadDir     string
}
