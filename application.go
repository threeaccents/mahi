package mahi

import (
	"context"
	"time"
)

type ApplicationService interface {
	Create(ctx context.Context, n *NewApplication) (*Application, error)
	Application(ctx context.Context, slug string) (*Application, error)
	Applications(ctx context.Context, sinceID string, limit int) ([]*Application, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, u *UpdateApplication) (*Application, error)
	BlobStorage(id string) (FileBlobStorage, error)
}

type ApplicationStorage interface {
	Store(ctx context.Context, n *NewApplication) (*Application, error)
	Application(ctx context.Context, id string) (*Application, error)
	Applications(ctx context.Context, sinceID string, limit int) ([]*Application, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, u *UpdateApplication) (*Application, error)
}

type Application struct {
	ID               string
	Name             string
	Description      string
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

type UpdateApplication struct {
	ID          string
	UserIDs     []string
	Name        string
	Description string
}

type NewApplication struct {
	Name             string `sql:",notnull"`
	Description      string
	StorageAccessKey string
	StorageSecretKey string
	StorageBucket    string
	StorageEndpoint  string
	StorageRegion    string
	StorageEngine    string
	DeliveryURL      string
}
