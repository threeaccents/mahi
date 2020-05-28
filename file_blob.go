package mahi

import (
	"context"
	"io"
	"os"
	"strings"
)

type FileBlobStorage interface {
	Upload(ctx context.Context, bucket string, b *FileBlob) error
	CreateBucket(ctx context.Context, bucket string) error
	FileBlob(ctx context.Context, bucket, id, tempDir string) (*FileBlob, error)
}

// FileBlob is holds the properties needed for the blob of a file.
type FileBlob struct {
	ID        string
	Data      io.ReadCloser
	MIMEValue string
	Size      int64

	// TempFileName this is used to determine if we need to delete the temp file after using the FileBlob
	TempFileName string
}

// Bytes transforms the data of the FileBlob into a byte array
func (b *FileBlob) Bytes(p []byte) (int, error) {
	n, err := b.Data.Read(p)
	if err != nil && err != io.EOF {
		return 0, err
	}

	if int64(n) != b.Size {
		return 0, io.ErrShortWrite
	}

	return n, nil
}

// Close closes the io.ReadCloser and deletes the temp file if one was used
func (b *FileBlob) Close() error {
	if err := b.Data.Close(); err != nil {
		return err
	}

	if b.TempFileName != "" {
		return os.RemoveAll(b.TempFileName)
	}

	return nil
}

func (b *FileBlob) IsImage() bool {
	mimeType := strings.Split(b.MIMEValue, "/")[0]
	return mimeType == "image" && b.MIMEValue != "image/svg+xml"
}

func (b *FileBlob) IsTransformable() bool {
	return b.IsImage() || b.MIMEValue == "application/pdf"
}
