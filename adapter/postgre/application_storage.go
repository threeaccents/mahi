package postgre

import (
	"context"
	"database/sql"
	"time"

	"github.com/threeaccents/mahi"

	"github.com/jackc/pgx/v4/pgxpool"
)

type Application struct {
	ID               string
	Name             string
	Description      sql.NullString
	StorageAccessKey string
	StorageSecretKey string
	StorageBucket    string
	StorageEndpoint  string
	StorageRegion    string
	StorageEngine    string
	DeliveryURL      string
	CreatedAt        time.Time
	UpdatedAt        time.Time
}

type ApplicationStorage struct {
	DB *pgxpool.Pool
}

func (s ApplicationStorage) Store(ctx context.Context, n *mahi.NewApplication) (*mahi.Application, error) {
	var a Application

	query := `
		INSERT INTO mahi_applications (name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING *
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(n.Name),
		NewNullString(n.Description),
		NewNullString(n.StorageEngine),
		NewNullString(n.StorageAccessKey),
		NewNullString(n.StorageSecretKey),
		NewNullString(n.StorageBucket),
		NewNullString(n.StorageEndpoint),
		NewNullString(n.StorageRegion),
		NewNullString(n.DeliveryURL),
	).Scan(
		&a.ID,
		&a.Name,
		&a.Description,
		&a.StorageEngine,
		&a.StorageAccessKey,
		&a.StorageSecretKey,
		&a.StorageRegion,
		&a.StorageBucket,
		&a.StorageEndpoint,
		&a.DeliveryURL,
		&a.CreatedAt,
		&a.UpdatedAt,
	); err != nil {
		return nil, err
	}

	mahiApp := sanitizeApp(a)

	return &mahiApp, nil
}

func (s ApplicationStorage) Application(ctx context.Context, id string) (*mahi.Application, error) {
	return nil, nil
}

func (s ApplicationStorage) ApplicationBySlug(ctx context.Context, slug string) (*mahi.Application, error) {
	return nil, nil
}

func (s ApplicationStorage) Applications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	return nil, nil
}

func (s ApplicationStorage) Update(ctx context.Context, u *mahi.UpdateApplication) (*mahi.Application, error) {
	return nil, nil
}

func (s ApplicationStorage) Delete(ctx context.Context, id string) error {
	return nil
}

func sanitizeApp(a Application) mahi.Application {
	description := ""
	if a.Description.Valid {
		description = a.Description.String
	}

	mahiApp := mahi.Application{
		ID:               a.ID,
		Name:             a.Name,
		Description:      description,
		StorageEngine:    a.StorageEngine,
		StorageAccessKey: a.StorageAccessKey,
		StorageSecretKey: a.StorageSecretKey,
		StorageEndpoint:  a.StorageEndpoint,
		StorageRegion:    a.StorageRegion,
		StorageBucket:    a.StorageBucket,
		DeliveryURL:      a.DeliveryURL,
		CreatedAt:        a.CreatedAt,
		UpdatedAt:        a.UpdatedAt,
	}

	return mahiApp
}
