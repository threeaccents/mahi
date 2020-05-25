package mahi

import (
	"context"
	"time"
)

// FileService handles the business logic for dealing with managing all aspects of a file.
type FileService interface {
	Create(ctx context.Context, n *NewFile) (*File, error)
	File(ctx context.Context, id string) (*File, error)
	ApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) (*File, error)
	Delete(ctx context.Context, id string) error
}

// FileStorage handles communication with the database for handling files.
type FileStorage interface {
	Store(ctx context.Context, n *NewFile) (*File, error)
	File(ctx context.Context, id string) (*File, error)
	FileByFileBlobID(ctx context.Context, fileBlobID string) (*File, error)
	ApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) (*File, error)
	Delete(ctx context.Context, id string) error
}

// File holds all the "meta" data of a file.
// From its type and size to who uploaded it and what application it was uploaded to.
type File struct {
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

func (f *File) IsImage() bool {
	return f.MIMEType == "image" && f.MIMEValue != "image/svg+xml"
}

func (f *File) IsTransformable() bool {
	return f.IsImage() || f.MIMEValue == "application/pdf"
}

// NewFile is a helper struct for creating a new file
type NewFile struct {
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
}

func (f *NewFile) IsImage() bool {
	return f.MIMEType == "image" && f.MIMEValue != "image/svg+xml"
}
