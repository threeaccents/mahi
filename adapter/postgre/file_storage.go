package postgre

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"

	"github.com/threeaccents/mahi"
)

type FileStorage struct {
	DB *pgxpool.Pool
}

func (s *FileStorage) Store(ctx context.Context, n *mahi.NewFile) (*mahi.File, error) {
	var f mahi.File

	query := `
		INSERT INTO files (application_id, file_name, file_blob_id)
		VALUES ($1, $2, $3)
		RETURNING *
 `

	if err := s.DB.QueryRow(ctx, query, n.ApplicationID, n.Filename, n.FileBlobID).Scan(&f.ID, &f.ApplicationID); err != nil {
		return nil, err
	}

	return &f, nil
}

func (s *FileStorage) File(ctx context.Context, id string) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) FileByFileBlobID(ctx context.Context, fileBlobID string) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) Files(ctx context.Context, sinceID string, limit int) (*mahi.File, error) {
	return nil, nil
}

func (s *FileStorage) Delete(ctx context.Context, id string) error {
	return nil
}
