package postgre

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/jackc/pgx/v4"

	"github.com/jackc/pgx/v4/pgxpool"

	"github.com/threeaccents/mahi"
)

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
	Hash          sql.NullString
	Width         sql.NullInt32
	Height        sql.NullInt32
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

type FileStorage struct {
	DB *pgxpool.Pool
}

func (s *FileStorage) Store(ctx context.Context, n *mahi.NewFile) (*mahi.File, error) {
	var f file

	query := `
		INSERT INTO mahi_files (application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
		RETURNING id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height, created_at, updated_at
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(n.ApplicationID),
		NewNullString(n.FileBlobID),
		NewNullString(n.Filename),
		NewNullInt64(n.Size),
		NewNullString(n.MIMEType),
		NewNullString(n.MIMEValue),
		NewNullString(n.Extension),
		NewNullString(n.URL),
		NewNullString(n.Hash),
		NewNullInt64(int64(n.Width)),
		NewNullInt64(int64(n.Height)),
	).Scan(
		&f.ID,
		&f.ApplicationID,
		&f.FileBlobID,
		&f.Filename,
		&f.Size,
		&f.MIMEType,
		&f.MIMEValue,
		&f.Extension,
		&f.URL,
		&f.Hash,
		&f.Width,
		&f.Height,
		&f.CreatedAt,
		&f.UpdatedAt,
	); err != nil {
		return nil, err
	}

	mahiFile := sanitizeFile(f)

	return &mahiFile, nil
}

func (s *FileStorage) File(ctx context.Context, id string) (*mahi.File, error) {
	var f file

	query := `
		Select id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height, created_at, updated_at 
		FROM mahi_files
		WHERE id = $1
		LIMIT 1

 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(id),
	).Scan(
		&f.ID,
		&f.ApplicationID,
		&f.FileBlobID,
		&f.Filename,
		&f.Size,
		&f.MIMEType,
		&f.MIMEValue,
		&f.Extension,
		&f.URL,
		&f.Hash,
		&f.Width,
		&f.Height,
		&f.CreatedAt,
		&f.UpdatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
			return nil, mahi.ErrFileNotFound
		}
		return nil, err
	}

	mahiFile := sanitizeFile(f)

	return &mahiFile, nil
}

func (s *FileStorage) FileByFileBlobID(ctx context.Context, fileBlobID string) (*mahi.File, error) {
	var f file

	query := `
		Select id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height, created_at, updated_at 
		FROM mahi_files
		WHERE file_blob_id = $1
		LIMIT 1

 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(fileBlobID),
	).Scan(
		&f.ID,
		&f.ApplicationID,
		&f.FileBlobID,
		&f.Filename,
		&f.Size,
		&f.MIMEType,
		&f.MIMEValue,
		&f.Extension,
		&f.URL,
		&f.Hash,
		&f.Width,
		&f.Height,
		&f.CreatedAt,
		&f.UpdatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
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
	var files []*mahi.File

	const query = `
	SELECT id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height, created_at, updated_at 
	FROM mahi_files
	WHERE application_id = $1
	ORDER BY created_at DESC
	LIMIT $2
`
	rows, err := s.DB.Query(ctx, query, applicationID, limit)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var f file
		if err := rows.Scan(
			&f.ID,
			&f.ApplicationID,
			&f.FileBlobID,
			&f.Filename,
			&f.Size,
			&f.MIMEType,
			&f.MIMEValue,
			&f.Extension,
			&f.URL,
			&f.Hash,
			&f.Width,
			&f.Height,
			&f.CreatedAt,
			&f.UpdatedAt,
		); err != nil {
			return nil, err
		}

		sanitizedFile := sanitizeFile(f)

		files = append(files, &sanitizedFile)
	}

	if rows.Err() != nil {
		return nil, err
	}

	return files, nil
}

func (s FileStorage) paginateApplicationFiles(ctx context.Context, applicationID, sinceID string, limit int) ([]*mahi.File, error) {
	var files []*mahi.File

	sinceFile, err := s.File(ctx, sinceID)
	if err != nil {
		return nil, err
	}

	const query = `
	SELECT id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height, created_at, updated_at 
	FROM mahi_files
	WHERE application_id = $1
	AND created_at < $2
	ORDER BY created_at DESC
	LIMIT $3
`

	fmt.Println(applicationID, sinceID)
	rows, err := s.DB.Query(ctx, query, applicationID, sinceFile.CreatedAt, limit)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var f file
		if err := rows.Scan(
			&f.ID,
			&f.ApplicationID,
			&f.FileBlobID,
			&f.Filename,
			&f.Size,
			&f.MIMEType,
			&f.MIMEValue,
			&f.Extension,
			&f.URL,
			&f.Hash,
			&f.Width,
			&f.Height,
			&f.CreatedAt,
			&f.UpdatedAt,
		); err != nil {
			return nil, err
		}

		sanitizedFile := sanitizeFile(f)

		files = append(files, &sanitizedFile)
	}

	if rows.Err() != nil {
		return nil, err
	}

	return files, nil
}

func (s *FileStorage) Delete(ctx context.Context, id string) error {
	const query = `
	DELETE FROM mahi_files
	WHERE id = $1
`
	r, err := s.DB.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	if r.RowsAffected() == 0 {
		return mahi.ErrFileNotFound
	}

	return nil
}

func sanitizeFile(f file) mahi.File {
	var width, height int
	var hash string

	if f.Width.Valid {
		width = int(f.Width.Int32)
	}

	if f.Height.Valid {
		height = int(f.Height.Int32)
	}

	if f.Hash.Valid {
		hash = f.Hash.String
	}

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
		Hash:          hash,
		Width:         width,
		Height:        height,
		CreatedAt:     f.CreatedAt,
		UpdatedAt:     f.UpdatedAt,
	}
}
