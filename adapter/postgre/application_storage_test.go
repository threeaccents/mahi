package postgre

import (
	"context"
	"testing"

	"syreclabs.com/go/faker"

	uuid "github.com/satori/go.uuid"
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
	completeApplicationWithNoEndpoint := &mahi.NewApplication{Name: faker.Name().String(), StorageEngine: testStorageEngine, StorageAccessKey: testStorageAccessKey, StorageBucket: testStorageBucket, StorageSecretKey: testStorageSecretKey, StorageRegion: testStorageRegion, DeliveryURL: testDeliveryURL}
	NoNameApplication := &mahi.NewApplication{StorageEngine: testStorageEngine, StorageAccessKey: testStorageAccessKey, StorageBucket: testStorageBucket, StorageSecretKey: testStorageSecretKey, StorageRegion: testStorageRegion, StorageEndpoint: testStorageEndpoint, DeliveryURL: testDeliveryURL}

	tests := []struct {
		newApp      *mahi.NewApplication
		expected    bool
		description string
	}{
		{completeApplication, true, "insert complete application is successful"},
		{completeApplication, false, "insert of duplipacte name should fail"},
		{completeApplicationWithNoDescription, true, "description shouldn't be required"},
		{completeApplicationWithNoEndpoint, true, "endpoint shouldn't be required"},
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
			assert.NotNil(t, a.CreatedAt, test.description)
			assert.NotNil(t, a.UpdatedAt, test.description)
			assert.Equal(t, test.newApp.Name, a.Name, "name should be equal", test.description)
			assert.Equal(t, test.newApp.Description, a.Description, "description should be equal", test.description)
			assert.Equal(t, test.newApp.StorageEngine, a.StorageEngine, "storage_engine should be equal", test.description)
			assert.Equal(t, test.newApp.StorageRegion, a.StorageRegion, "storage_region should be equal", test.description)
			assert.Equal(t, test.newApp.StorageAccessKey, a.StorageAccessKey, "storage_access_key should be equal", test.description)
			assert.Equal(t, test.newApp.StorageSecretKey, a.StorageSecretKey, "storage_secret_key should be equal", test.description)
			assert.Equal(t, test.newApp.StorageEndpoint, a.StorageEndpoint, "storage_endpoint should be equal", test.description)
			assert.Equal(t, test.newApp.StorageBucket, a.StorageBucket, "storage_bucket should be equal", test.description)
			assert.Equal(t, test.newApp.DeliveryURL, a.DeliveryURL, "delivery_url should be equal", test.description)
		}
	}
}

func TestApplicationStorage_Application(t *testing.T) {
	nonExistentID := uuid.NewV4().String()
	existentID := testApplication.ID
	notUUID := "hello"

	tests := []struct {
		id          string
		expected    bool
		description string
		errType     interface{}
	}{
		{existentID, true, "application should be returned", nil},
		{nonExistentID, false, "application with wrong id should return err", mahi.ErrApplicationNotFound},
		{notUUID, false, "application with invalid uuid should return error", nil},
	}

	ctx := context.Background()

	for _, test := range tests {
		a, err := testApplicationStorage.Application(ctx, test.id)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
		}

		if test.errType != nil {
			assert.Equal(t, err, mahi.ErrApplicationNotFound, "error should be mahi.ErrApplicationNotFound")
		}

		if err == nil {
			assert.Equal(t, testApplication.ID, a.ID, "id should be equal", test.description)
			assert.Equal(t, testApplication.Name, a.Name, "name should be equal", test.description)
			assert.Equal(t, testApplication.Description, a.Description, "description should be equal", test.description)
			assert.Equal(t, testApplication.StorageEngine, a.StorageEngine, "storage_engine should be equal", test.description)
			assert.Equal(t, testApplication.StorageRegion, a.StorageRegion, "storage_region should be equal", test.description)
			assert.Equal(t, testApplication.StorageAccessKey, a.StorageAccessKey, "storage_access_key should be equal", test.description)
			assert.Equal(t, testApplication.StorageSecretKey, a.StorageSecretKey, "storage_secret_key should be equal", test.description)
			assert.Equal(t, testApplication.StorageEndpoint, a.StorageEndpoint, "storage_endpoint should be equal", test.description)
			assert.Equal(t, testApplication.StorageBucket, a.StorageBucket, "storage_bucket should be equal", test.description)
			assert.Equal(t, testApplication.DeliveryURL, a.DeliveryURL, "delivery_url should be equal", test.description)
		}
	}
}

func TestApplicationStorage_Applications(t *testing.T) {
	tests := []struct {
		sinceID     string
		expected    bool
		description string
	}{
		{"", true, "applications should be returned"},
		{testApplication.ID, true, "applications should be returned"},
	}

	for _, test := range tests {
		a, err := testApplicationStorage.Applications(context.Background(), test.sinceID, 10)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test %s. error %v", test.description, err)
		}

		if err == nil {
			if !assert.NotEmpty(t, a) {
				t.Errorf("test %s. error at least 1 application should be returned", test.description)
			}
		}
	}
}

func TestApplicationStorage_Update(t *testing.T) {
	updatedName := &mahi.UpdateApplication{Name: faker.Name().String(), ID: testApplication.ID}
	updatedNameAndDesc := &mahi.UpdateApplication{Name: faker.Name().String(), Description: "udpated", ID: testApplication.ID}
	nonExistentID := &mahi.UpdateApplication{Name: faker.Name().String(), ID: uuid.NewV4().String()}

	tests := []struct {
		newApp      *mahi.UpdateApplication
		expected    bool
		errType     interface{}
		description string
	}{
		{updatedName, true, nil, "update should succedd"},
		{updatedNameAndDesc, true, nil, "update should succedd"},
		{nonExistentID, false, mahi.ErrApplicationNotFound, "update should error with application not found"},
	}

	ctx := context.Background()

	for _, test := range tests {
		a, err := testApplicationStorage.Update(ctx, test.newApp)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
			return
		}

		if test.errType != nil {
			assert.Equal(t, err, mahi.ErrApplicationNotFound, "error should be mahi.ErrApplicationNotFound")
		}

		if err == nil {
			assert.Equal(t, testApplication.ID, a.ID, "id should be equal", test.description)
			assert.Equal(t, test.newApp.Name, a.Name, "name should be equal", test.description)
			assert.Equal(t, test.newApp.Description, a.Description, "description should be equal", test.description)
			assert.Equal(t, testApplication.StorageEngine, a.StorageEngine, "storage_engine should be equal", test.description)
			assert.Equal(t, testApplication.StorageRegion, a.StorageRegion, "storage_region should be equal", test.description)
			assert.Equal(t, testApplication.StorageAccessKey, a.StorageAccessKey, "storage_access_key should be equal", test.description)
			assert.Equal(t, testApplication.StorageSecretKey, a.StorageSecretKey, "storage_secret_key should be equal", test.description)
			assert.Equal(t, testApplication.StorageEndpoint, a.StorageEndpoint, "storage_endpoint should be equal", test.description)
			assert.Equal(t, testApplication.StorageBucket, a.StorageBucket, "storage_bucket should be equal", test.description)
			assert.Equal(t, testApplication.DeliveryURL, a.DeliveryURL, "delivery_url should be equal", test.description)
		}
	}
}

func TestApplicationStorage_Delete(t *testing.T) {
	nonExistentID := uuid.NewV4().String()
	existentID := testDeletableApplication.ID
	notUUID := "hello"

	tests := []struct {
		id          string
		expected    bool
		description string
		errType     interface{}
	}{
		{existentID, true, "application should be returned", nil},
		{nonExistentID, false, "application with wrong id should return err", mahi.ErrApplicationNotFound},
		{notUUID, false, "application with invalid uuid should return error", nil},
	}

	ctx := context.Background()

	for _, test := range tests {
		err := testApplicationStorage.Delete(ctx, test.id)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
		}

		if test.errType != nil {
			assert.Equal(t, err, mahi.ErrApplicationNotFound, "error should be mahi.ErrApplicationNotFound")
		}
	}
}
