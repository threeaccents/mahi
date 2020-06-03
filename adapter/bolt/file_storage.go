package bolt

import (
	"context"
	"errors"
	"time"

	"github.com/asdine/storm/v3/q"

	uuid "github.com/satori/go.uuid"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type FileStorage struct {
	DB *storm.DB
}

type file struct {
	Pk            int    `storm:"id,increment"`
	ID            string `storm:"index"`
	ApplicationID string `storm:"index"`
	Filename      string
	FileBlobID    string `storm:"index"`
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

func (f file) validate() error {
	if f.ApplicationID == "" {
		return errors.New("ApplicationID is required")
	}

	if f.Filename == "" {
		return errors.New("filename is required")
	}

	if f.FileBlobID == "" {
		return errors.New("FileBlobID is required")
	}

	if f.Size == 0 {
		return errors.New("Size is required")
	}

	if f.MIMEType == "" {
		return errors.New("MIMEType is required")
	}

	if f.MIMEValue == "" {
		return errors.New("MIMEValue is required")
	}

	if f.URL == "" {
		return errors.New("URL is required")
	}

	if f.Filename == "" {
		return errors.New("filename is required")
	}

	return nil
}

func (s *FileStorage) Store(ctx context.Context, n *mahi.NewFile) (*mahi.File, error) {
	f := file{
		ID:            uuid.NewV4().String(),
		ApplicationID: n.ApplicationID,
		Filename:      n.Filename,
		FileBlobID:    n.FileBlobID,
		Size:          n.Size,
		MIMEType:      n.MIMEType,
		MIMEValue:     n.MIMEValue,
		Extension:     n.Extension,
		URL:           n.URL,
		Hash:          n.Hash,
		Width:         n.Width,
		Height:        n.Height,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	if err := f.validate(); err != nil {
		return nil, err
	}

	if err := s.DB.Save(&f); err != nil {
		return nil, err
	}

	mahiFile := sanitizeFile(f)

	return &mahiFile, nil
}

func (s *FileStorage) File(ctx context.Context, id string) (*mahi.File, error) {
	var f file
	if err := s.DB.One("ID", id, &f); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrFileNotFound
		}
		return nil, err
	}

	mahiFile := sanitizeFile(f)

	return &mahiFile, nil
}

func (s *FileStorage) boltFile(ctx context.Context, id string) (*file, error) {
	var f file
	if err := s.DB.One("ID", id, &f); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrFileNotFound
		}
		return nil, err
	}

	return &f, nil
}

func (s *FileStorage) FileByFileBlobID(ctx context.Context, fileBlobID string) (*mahi.File, error) {
	var f file
	if err := s.DB.One("FileBlobID", fileBlobID, &f); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrFileNotFound
		}
		return nil, err
	}

	mahiFile := sanitizeFile(f)

	return &mahiFile, nil
}

func (s FileStorage) ApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	if sinceID == "" {
		return s.applicationFiles(ctx, applicationID, limit)
	}

	return s.paginateApplicationFiles(ctx, applicationID, sinceID, limit)
}

func (s FileStorage) applicationFiles(ctx context.Context, applicationID string, limit int) ([]*mahi.File, error) {
	var files []*file
	if err := s.DB.Select(q.Eq("ApplicationID", applicationID)).Limit(limit).OrderBy("CreatedAt").Reverse().Find(&files); err != nil {
		if err == storm.ErrNotFound {
			return []*mahi.File{}, nil
		}
		return nil, err
	}

	var mahiFiles []*mahi.File

	for _, f := range files {
		mahiApp := sanitizeFile(*f)

		mahiFiles = append(mahiFiles, &mahiApp)
	}

	return mahiFiles, nil
}

func (s FileStorage) paginateApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	sinceFile, err := s.boltFile(ctx, sinceID)
	if err != nil {
		return nil, err
	}

	var files []*file
	if err := s.DB.Select(q.Lt("Pk", sinceFile.Pk), q.Eq("ApplicationID", applicationID)).Limit(limit).OrderBy("CreatedAt").Reverse().Find(&files); err != nil {
		if err == storm.ErrNotFound {
			return []*mahi.File{}, nil
		}
		return nil, err
	}

	var mahiFiles []*mahi.File

	for _, f := range files {
		mahiApp := sanitizeFile(*f)

		mahiFiles = append(mahiFiles, &mahiApp)
	}

	return mahiFiles, nil
}

func (s *FileStorage) Delete(ctx context.Context, id string) error {
	f, err := s.boltFile(ctx, id)
	if err != nil {
		return err
	}

	if err := s.DB.DeleteStruct(f); err != nil {
		return err
	}

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
