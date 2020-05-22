package mahi

import "time"

// FileService handles the business logic for dealing with managing all aspects of a file.
type FileService interface {
	ApplicationFiles(applicationID, sinceID string, limit int) ([]*File, error)
	Search(applicationID, query string) ([]*File, error)
	Delete(id string) error
}

// FileStorage handles communication with the database for handling files.
type FileStorage interface {
	Store(n *NewFile) (*File, error)
	FileByFileBlobID(key string) (*File, error)
	File(id string) (*File, error)
	ApplicationFiles(applicationID, sinceID string, limit int) ([]*File, error)
	Search(applicationID, query string) ([]*File, error)
	Delete(id string) error
}

// File holds all the "meta" data of a file.
// From its type and size to who uploaded it and what application it was uploaded to.
type File struct {
	ID            string
	ApplicationID string
	Application   *Application
	UploaderID    string
	Uploader      *User
	Filename      string
	FileBlobID    string
	Size          int64
	MIMEType      string
	MIMEValue     string
	Extension     string
	URL           string
	Hash          string
	Description   string
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
	UploaderID    string
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
