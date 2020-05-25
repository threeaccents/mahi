package mahi

import (
	"context"
	"io"
	"mime/multipart"
)

type UploadService interface {
	Upload(ctx context.Context, r *multipart.Reader) (*File, error)
	ChunkUpload(ctx context.Context, r *multipart.Reader) error
	CompleteChunkUpload(ctx context.Context, uploadID, filename string) (*File, error)
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
