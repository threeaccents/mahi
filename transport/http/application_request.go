package http

import (
	"errors"

	"github.com/asaskevich/govalidator"

	"github.com/threeaccents/mahi"
)

type createApplicationRequest struct {
	Name             string `json:"name" `
	Description      string `json:"description"`
	StorageAccessKey string `json:"storageAccessKey" `
	StorageSecretKey string `json:"storageSecretKey"`
	StorageRegion    string `json:"storageRegion" `
	StorageEngine    string `json:"storageEngine"`
	DeliveryURL      string `json:"deliveryUrl"`
}

func (r *createApplicationRequest) validate() error {
	if r.Name == "" {
		return errors.New("name is required")
	}
	if r.StorageAccessKey == "" {
		return errors.New("storageAccessKey is required")
	}
	if r.StorageSecretKey == "" {
		return errors.New("storageSecretKey is required")
	}
	if r.StorageRegion == "" {
		return errors.New("storageRegion is required")
	}
	if r.DeliveryURL == "" {
		return errors.New("deliveryUrl is required")
	}
	if r.StorageEngine == "" {
		return errors.New("storageEngine is required")
	}
	if !mahi.StrContains(r.StorageEngine, mahi.AvailableStorageEngines) {
		return errors.New("invalid storage engine")
	}

	return nil
}

type updateApplicationRequest struct {
	ID          string `json:"id"`
	Name        string `json:"name" `
	Description string `json:"description"`
}

func (r *updateApplicationRequest) validate() error {
	if r.ID == "" {
		return errors.New("id is required")
	}
	if !govalidator.IsUUIDv4(r.ID) {
		return errors.New("invalid id")
	}
	if r.Name == "" {
		return errors.New("name is required")
	}

	return nil
}

type listApplicationQueryParam struct {
	Limit   int    `schema:"limit"`
	SinceID string `schema:"since_id"`
}
