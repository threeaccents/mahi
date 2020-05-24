package mahi

import "time"

type ApplicationService interface {
	Create(n *NewApplication) (*Application, error)
	Application(slug string) (*Application, error)
	Applications(sinceID string, limit int) ([]*Application, error)
	Delete(id string) error
	Update(u *UpdateApplication) (*Application, error)
	BlobStorage(id string) (FileBlobStorage, error)
}

type ApplicationStorage interface {
	Store(n *NewApplication) (*Application, error)
	Application(id string) (*Application, error)
	ApplicationBySlug(slug string) (*Application, error)
	Applications(sinceID string, limit int) ([]*Application, error)
	Delete(id string) error
	Update(u *UpdateApplication) (*Application, error)
}

type Application struct {
	ID               string
	Name             string
	Slug             string
	Description      string
	StorageAccessKey string
	StorageSecretKey string
	StorageBucket    string
	StorageEndpoint  string
	StorageRegion    string
	StorageEngine    string
	CreatedAt        time.Time
	UpdatedAt        time.Time
	DeletedAt        time.Time
}

type UpdateApplication struct {
	ID          string
	UserIDs     []string
	Name        string
	Description string
}

type NewApplication struct {
	Name             string
	Slug             string
	Description      string
	StorageAccessKey string
	StorageSecretKey string
	StorageBucket    string
	StorageEndpoint  string
	StorageRegion    string
	StorageEngine    string
}
