package http

import (
	"time"

	"github.com/threeaccents/mahi"
)

type applicationResponse struct {
	Data *applicationData `json:"data"`
}

type applicationsResponse struct {
	PaginationData PaginationData     `json:"meta"`
	Data           []*applicationData `json:"data"`
}

type applicationData struct {
	ID               string    `json:"id"`
	Name             string    `json:"name"`
	Description      string    `json:"description"`
	StorageAccessKey string    `json:"storageAccessKey"`
	StorageBucket    string    `json:"storageBucket"`
	StorageEndpoint  string    `json:"storageEndpoint"`
	StorageRegion    string    `json:"storageRegion"`
	StorageEngine    string    `json:"storageEngine"`
	DeliveryURL      string    `json:"cdnUrl"`
	CreatedAt        time.Time `json:"createdAt"`
	UpdatedAt        time.Time `json:"updatedAt"`
}

func sanitizeApplication(v *mahi.Application) *applicationData {
	return &applicationData{
		ID:               v.ID,
		Name:             v.Name,
		Description:      v.Description,
		StorageAccessKey: v.StorageAccessKey,
		StorageBucket:    v.StorageBucket,
		StorageEndpoint:  v.StorageEndpoint,
		StorageRegion:    v.StorageRegion,
		StorageEngine:    v.StorageEngine,
		DeliveryURL:      v.DeliveryURL,
		CreatedAt:        v.CreatedAt,
		UpdatedAt:        v.UpdatedAt,
	}
}

func sanitizeApplications(v []*mahi.Application) []*applicationData {
	ss := make([]*applicationData, len(v))
	for x, u := range v {
		nu := sanitizeApplication(u)
		ss[x] = nu
	}

	return ss
}
