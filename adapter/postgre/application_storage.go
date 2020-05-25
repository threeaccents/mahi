package postgre

import (
	"context"
	"database/sql"
	"time"

	"github.com/jackc/pgx/v4"

	"github.com/threeaccents/mahi"

	"github.com/jackc/pgx/v4/pgxpool"
)

type application struct {
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
	var a application

	query := `
		INSERT INTO mahi_applications (name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
		RETURNING id, name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url, created_at, updated_at
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
		&a.StorageBucket,
		&a.StorageEndpoint,
		&a.StorageRegion,
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
	var a application

	query := `
		SELECT id, name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url, created_at, updated_at
		FROM mahi_applications
		WHERE id = $1
		LIMIT 1
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		id,
	).Scan(
		&a.ID,
		&a.Name,
		&a.Description,
		&a.StorageEngine,
		&a.StorageAccessKey,
		&a.StorageSecretKey,
		&a.StorageBucket,
		&a.StorageEndpoint,
		&a.StorageRegion,
		&a.DeliveryURL,
		&a.CreatedAt,
		&a.UpdatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
			return nil, mahi.ErrApplicationNotFound
		}
		return nil, err
	}

	mahiApp := sanitizeApp(a)

	return &mahiApp, nil
}

func (s ApplicationStorage) Applications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	if sinceID == "" {
		return s.applications(ctx, limit)
	}

	return s.paginateApplications(ctx, sinceID, limit)
}

func (s ApplicationStorage) applications(ctx context.Context, limit int) ([]*mahi.Application, error) {
	var applications []*mahi.Application

	const query = `
	SELECT id, name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url, created_at, updated_at
	FROM mahi_applications
	ORDER BY created_at DESC
	Limit $1
`
	rows, err := s.DB.Query(ctx, query, limit)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var a application
		if err := rows.Scan(
			&a.ID,
			&a.Name,
			&a.Description,
			&a.StorageEngine,
			&a.StorageAccessKey,
			&a.StorageSecretKey,
			&a.StorageBucket,
			&a.StorageEndpoint,
			&a.StorageRegion,
			&a.DeliveryURL,
			&a.CreatedAt,
			&a.UpdatedAt,
		); err != nil {
			return nil, err
		}

		sanitizedApp := sanitizeApp(a)

		applications = append(applications, &sanitizedApp)
	}

	if rows.Err() != nil {
		return nil, err
	}

	return applications, nil
}

func (s ApplicationStorage) paginateApplications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	var applications []*mahi.Application

	sinceApp, err := s.Application(ctx, sinceID)
	if err != nil {
		return nil, err
	}

	const query = `
	SELECT id, name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url, created_at, updated_at
	FROM mahi_applications
	WHERE created_at < $1
	ORDER BY created_at DESC
	Limit $2
`
	rows, err := s.DB.Query(ctx, query, sinceApp.CreatedAt, limit)
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var a application
		if err := rows.Scan(
			&a.ID,
			&a.Name,
			&a.Description,
			&a.StorageEngine,
			&a.StorageAccessKey,
			&a.StorageSecretKey,
			&a.StorageBucket,
			&a.StorageEndpoint,
			&a.StorageRegion,
			&a.DeliveryURL,
			&a.CreatedAt,
			&a.UpdatedAt,
		); err != nil {
			return nil, err
		}

		sanitizedApp := sanitizeApp(a)

		applications = append(applications, &sanitizedApp)
	}

	if rows.Err() != nil {
		return nil, err
	}

	return applications, nil
}

func (s ApplicationStorage) Update(ctx context.Context, u *mahi.UpdateApplication) (*mahi.Application, error) {
	var a application

	query := `
		UPDATE mahi_applications
		SET name        = $1,
			description = $2
		WHERE id = $3
		RETURNING id, name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url, created_at, updated_at
 `

	if err := s.DB.QueryRow(
		ctx,
		query,
		NewNullString(u.Name),
		NewNullString(u.Description),
		NewNullString(u.ID),
	).Scan(
		&a.ID,
		&a.Name,
		&a.Description,
		&a.StorageEngine,
		&a.StorageAccessKey,
		&a.StorageSecretKey,
		&a.StorageBucket,
		&a.StorageEndpoint,
		&a.StorageRegion,
		&a.DeliveryURL,
		&a.CreatedAt,
		&a.UpdatedAt,
	); err != nil {
		if err == pgx.ErrNoRows {
			return nil, mahi.ErrApplicationNotFound
		}
		return nil, err
	}

	mahiApp := sanitizeApp(a)

	return &mahiApp, nil
}

func (s ApplicationStorage) Delete(ctx context.Context, id string) error {
	const query = `
	DELETE FROM mahi_applications
	WHERE id = $1
`
	r, err := s.DB.Exec(ctx, query, id)
	if err != nil {
		return err
	}

	if r.RowsAffected() == 0 {
		return mahi.ErrApplicationNotFound
	}

	return nil
}

func sanitizeApp(a application) mahi.Application {
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
