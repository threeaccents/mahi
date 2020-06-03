package bolt

import (
	"context"
	"time"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type FileStorage struct {
	DB *storm.DB
}

type file struct {
	ID            string
	ApplicationID string
	Filename      string
	FileBlobID    string
	Size          int64
	MIMEType      string
	MIMEValue     string
	Extension     string
	URL           string
	Hash          string
	Width         int
	Height        int
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

func (s *FileStorage) Store(ctx context.Context, n *mahi.NewFile) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) File(ctx context.Context, id string) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) FileByFileBlobID(ctx context.Context, fileBlobID string) (*mahi.File, error) {
	return nil, nil
}

func (s FileStorage) ApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	return nil, nil
}

func (s FileStorage) applicationFiles(ctx context.Context, applicationID string, limit int) ([]*mahi.File, error) {
	return nil, nil
}

func (s FileStorage) paginateApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) Delete(ctx context.Context, id string) error {
	return nil
}

func sanitizeFile(f file) mahi.File {
	return mahi.File{
		ID:            f.ID,
		ApplicationID: f.ApplicationID,
		FileBlobID:    f.FileBlobID,
		Filename:      f.Filename,
		Size:          f.Size,
		MIMEType:      f.MIMEType,
		MIMEValue:     f.MIMEValue,
		Extension:     f.Extension,
		URL:           f.URL,
		Hash:          f.Hash,
		Width:         f.Width,
		Height:        f.Height,
		CreatedAt:     f.CreatedAt,
		UpdatedAt:     f.UpdatedAt,
	}
}
