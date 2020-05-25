package postgre

import (
	"context"
	"testing"

	"syreclabs.com/go/faker"

	"github.com/stretchr/testify/assert"
	"github.com/threeaccents/mahi"
)

const (
	testStorageEngine    = "test-storage"
	testStorageAccessKey = "test storage access key"
	testStorageBucket    = "testbucket"
	testStorageSecretKey = "test secret"
	testStorageRegion    = "test region"
	testStorageEndpoint  = "test endpoint"
	testDeliveryURL      = "test iurl"
)

func TestApplicationStorage_Store(t *testing.T) {
	completeApplication := &mahi.NewApplication{Name: faker.Name().String(), Description: "hello", StorageEngine: testStorageEngine, StorageAccessKey: testStorageAccessKey, StorageBucket: testStorageBucket, StorageSecretKey: testStorageSecretKey, StorageRegion: testStorageRegion, StorageEndpoint: testStorageEndpoint, DeliveryURL: testDeliveryURL}
	completeApplicationWithNoDescription := &mahi.NewApplication{Name: faker.Name().String(), StorageEngine: testStorageEngine, StorageAccessKey: testStorageAccessKey, StorageBucket: testStorageBucket, StorageSecretKey: testStorageSecretKey, StorageRegion: testStorageRegion, StorageEndpoint: testStorageEndpoint, DeliveryURL: testDeliveryURL}
	NoNameApplication := &mahi.NewApplication{StorageEngine: testStorageEngine, StorageAccessKey: testStorageAccessKey, StorageBucket: testStorageBucket, StorageSecretKey: testStorageSecretKey, StorageRegion: testStorageRegion, StorageEndpoint: testStorageEndpoint, DeliveryURL: testDeliveryURL}

	tests := []struct {
		newApp      *mahi.NewApplication
		expected    bool
		description string
	}{
		{completeApplication, true, "insert complete application is successful"},
		{completeApplicationWithNoDescription, true, "description shouldn't be required"},
		{NoNameApplication, false, "insert application with no name should fail"},
	}

	ctx := context.Background()

	for _, test := range tests {
		a, err := testApplicationStorage.Store(ctx, test.newApp)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
			return
		}

		if err == nil {
			assert.NotNil(t, a.ID, test.description)
			assert.Equal(t, test.newApp.Name, a.Name, "name should be equal", test.description)
			assert.Equal(t, test.newApp.Description, a.Description, "description should be equal", test.description)
			assert.Equal(t, test.newApp.StorageEngine, a.StorageEngine, "storage_engine should be equal", test.description)
			assert.Equal(t, test.newApp.StorageRegion, a.StorageRegion, "storage_region should be equal", test.description)
		}
	}
}
