package bolt

import (
	"context"
	"errors"
	"time"

	"github.com/asdine/storm/v3/q"

	"github.com/asdine/storm/v3"

	uuid "github.com/satori/go.uuid"

	"github.com/threeaccents/mahi"
)

type application struct {
	Pk               int    `storm:"id,increment"`
	ID               string `storm:"index"`
	Name             string `storm:"unique"`
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

func (a application) validate() error {
	if a.ID == "" {
		return errors.New("id is required")
	}

	if a.Name == "" {
		return errors.New("name is required")
	}

	if a.StorageAccessKey == "" {
		return errors.New("StorageAccessKey is required")
	}

	if a.StorageSecretKey == "" {
		return errors.New("StorageSecretKey is required")
	}

	if a.StorageBucket == "" {
		return errors.New("StorageBucket is required")
	}

	if a.StorageRegion == "" {
		return errors.New("StorageRegion is required")
	}

	if a.StorageEngine == "" {
		return errors.New("StorageEngine is required")
	}

	if a.DeliveryURL == "" {
		return errors.New("DeliveryURL is required")
	}

	return nil
}

type ApplicationStorage struct {
	DB *storm.DB
}

func (s ApplicationStorage) Store(ctx context.Context, n *mahi.NewApplication) (*mahi.Application, error) {
	a := application{
		ID:               uuid.NewV4().String(),
		Name:             n.Name,
		Description:      n.Description,
		StorageAccessKey: n.StorageAccessKey,
		StorageSecretKey: n.StorageSecretKey,
		StorageEndpoint:  n.StorageEndpoint,
		StorageEngine:    n.StorageEngine,
		StorageBucket:    n.StorageBucket,
		StorageRegion:    n.StorageRegion,
		DeliveryURL:      n.DeliveryURL,
		CreatedAt:        time.Now(),
		UpdatedAt:        time.Now(),
	}

	if err := a.validate(); err != nil {
		return nil, err
	}

	if err := s.DB.Save(&a); err != nil {
		if err == storm.ErrAlreadyExists {
			return nil, mahi.ErrApplicationNameTaken
		}
		return nil, err
	}

	mahiApp := sanitizeApp(a)

	return &mahiApp, nil
}

func (s ApplicationStorage) Application(ctx context.Context, id string) (*mahi.Application, error) {
	var a application
	if err := s.DB.One("ID", id, &a); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrApplicationNotFound
		}
		return nil, err
	}

	mahiApp := sanitizeApp(a)

	return &mahiApp, nil
}

func (s ApplicationStorage) boltApplication(ctx context.Context, id string) (*application, error) {
	var a application
	if err := s.DB.One("ID", id, &a); err != nil {
		if err == storm.ErrNotFound {
			return nil, mahi.ErrApplicationNotFound
		}
		return nil, err
	}

	return &a, nil
}

func (s ApplicationStorage) Applications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	if sinceID == "" {
		return s.applications(ctx, limit)
	}

	return s.paginateApplications(ctx, sinceID, limit)
}

func (s ApplicationStorage) applications(ctx context.Context, limit int) ([]*mahi.Application, error) {
	var applications []*application
	if err := s.DB.Select().Limit(limit).OrderBy("CreatedAt").Reverse().Find(&applications); err != nil {
		if err == storm.ErrNotFound {
			return []*mahi.Application{}, nil
		}
		return nil, err
	}

	var mahiApplications []*mahi.Application

	for _, a := range applications {
		mahiApp := sanitizeApp(*a)

		mahiApplications = append(mahiApplications, &mahiApp)
	}

	return mahiApplications, nil
}

func (s ApplicationStorage) paginateApplications(ctx context.Context, sinceID string, limit int) ([]*mahi.Application, error) {
	sinceApp, err := s.boltApplication(ctx, sinceID)
	if err != nil {
		return nil, err
	}

	var applications []*application
	if err := s.DB.Select(q.Lt("Pk", sinceApp.Pk)).Limit(limit).OrderBy("CreatedAt").Reverse().Find(&applications); err != nil {
		if err == storm.ErrNotFound {
			return []*mahi.Application{}, nil
		}
		return nil, err
	}

	var mahiApplications []*mahi.Application

	for _, a := range applications {
		mahiApp := sanitizeApp(*a)

		mahiApplications = append(mahiApplications, &mahiApp)
	}

	return mahiApplications, nil
}

func (s ApplicationStorage) Update(ctx context.Context, u *mahi.UpdateApplication) (*mahi.Application, error) {
	a, err := s.boltApplication(ctx, u.ID)
	if err != nil {
		return nil, err
	}

	a.Name = u.Name
	a.Description = u.Description
	a.UpdatedAt = time.Now()

	if err := a.validate(); err != nil {
		return nil, err
	}

	if err := s.DB.Save(a); err != nil {
		if err == storm.ErrAlreadyExists {
			return nil, mahi.ErrApplicationNameTaken
		}
		return nil, err
	}

	mahiApp := sanitizeApp(*a)

	return &mahiApp, nil
}

func (s ApplicationStorage) Delete(ctx context.Context, id string) error {
	a, err := s.boltApplication(ctx, id)
	if err != nil {
		return err
	}

	if err := s.DB.DeleteStruct(a); err != nil {
		return err
	}

	return nil
}

func sanitizeApp(a application) mahi.Application {
	mahiApp := mahi.Application{
		ID:               a.ID,
		Name:             a.Name,
		Description:      a.Description,
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
