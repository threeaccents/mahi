package http

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/threeaccents/mahi/mock"

	"github.com/threeaccents/mahi"
	"syreclabs.com/go/faker"

	"context"

	"github.com/stretchr/testify/assert"
)

var (
	completeApplicationRequest           = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3, DeliveryURL: "delivery"}
	noDescriptionApplicationRequest      = &createApplicationRequest{Name: faker.Name().String(), StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3, DeliveryURL: "testurl"}
	nameMissingApplicationRequest        = &createApplicationRequest{Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3, DeliveryURL: "testurl"}
	accessKeyMissingApplicationRequest   = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3, DeliveryURL: "testurl"}
	secretKeyMissingApplicationRequest   = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageEngine: mahi.StorageEngineS3, DeliveryURL: "testurl"}
	regionMissingApplicationRequest      = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3, DeliveryURL: "testurl"}
	engineMissingApplicationRequest      = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", DeliveryURL: "testurl"}
	deliveryURLMissingApplicationRequest = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}
	wrongEngineApplicationRequest        = &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: "wrong-engine", DeliveryURL: "testurl"}
	wrongJSONApplicationRequest          = &testBadJSON{Name: 1}
)

func TestHandleCreateApplication(t *testing.T) {
	tests := []struct {
		payload     interface{}
		respCode    int
		description string
	}{
		{completeApplicationRequest, http.StatusCreated, "application should be created"},
		{noDescriptionApplicationRequest, http.StatusCreated, "application should be created without a description"},
		{nameMissingApplicationRequest, http.StatusBadRequest, "name is required"},
		{accessKeyMissingApplicationRequest, http.StatusBadRequest, "accessKey is required"},
		{secretKeyMissingApplicationRequest, http.StatusBadRequest, "secretKey is required"},
		{regionMissingApplicationRequest, http.StatusBadRequest, "region is required"},
		{engineMissingApplicationRequest, http.StatusBadRequest, "engine is required"},
		{wrongEngineApplicationRequest, http.StatusBadRequest, "correct engine is required"},
		{deliveryURLMissingApplicationRequest, http.StatusBadRequest, "delivery url is required"},
		{wrongJSONApplicationRequest, http.StatusBadRequest, "incorrect json format should fail"},
	}

	for _, test := range tests {
		b, err := json.Marshal(test.payload)
		if err != nil {
			t.Fatal(err)
		}

		req, err := http.NewRequest("POST", "/applications", bytes.NewReader(b))
		if err != nil {
			t.Fatal(err)
		}

		ctx := req.Context()
		ctx = context.WithValue(ctx, reqIDContextKey("req_id"), "abc123")

		req = req.WithContext(ctx)

		rr := httptest.NewRecorder()
		testRouter.Handle("/applications",
			testServer.handleCreateApplication()).Methods("POST")

		testRouter.ServeHTTP(rr, req)

		assert.Equal(t, test.respCode, rr.Code, test.description)
	}
}

func TestHandleCreateApplication_CorrectJSONResponsePayload(t *testing.T) {
	b, err := json.Marshal(completeApplicationRequest)
	if err != nil {
		t.Fatal(err)
	}

	req, err := http.NewRequest("POST", "/applications", bytes.NewReader(b))
	if err != nil {
		t.Fatal(err)
	}

	ctx := req.Context()
	ctx = context.WithValue(ctx, reqIDContextKey("req_id"), "abc123")

	req = req.WithContext(ctx)

	rr := httptest.NewRecorder()
	testRouter.Handle("/applications",
		testServer.handleCreateApplication()).Methods("POST")

	testRouter.ServeHTTP(rr, req)

	assert.Equal(t, http.StatusCreated, rr.Code)

	var payload applicationResponse
	if err := json.NewDecoder(rr.Body).Decode(&payload); err != nil {
		t.Error(err)
		return
	}

	assert.NotNil(t, payload.Data, "data should not be empty")
	assert.NotNil(t, payload.Data.ID, "id should not be empty")
	assert.NotNil(t, payload.Data.StorageBucket, "bucket should not be empty")
	assert.NotNil(t, payload.Data.CreatedAt, "created at should not be empty")
	assert.NotNil(t, payload.Data.UpdatedAt, "updated at should not be empty")
	assert.NotNil(t, payload.Data.StorageEndpoint, "endpoint at should not be empty")
	assert.Equal(t, completeApplicationRequest.Name, payload.Data.Name, "name should be equal to request")
	assert.Equal(t, completeApplicationRequest.Description, payload.Data.Description, "Description should be equal to request")
	assert.Equal(t, completeApplicationRequest.StorageAccessKey, payload.Data.StorageAccessKey, "StorageAccessKey should be equal to request")
	assert.Equal(t, completeApplicationRequest.StorageRegion, payload.Data.StorageRegion, "StorageRegion should be equal to request")
	assert.Equal(t, completeApplicationRequest.DeliveryURL, payload.Data.DeliveryURL, "DeliveryURL should be equal to request")
}

func TestHandleGetApplication(t *testing.T) {
	nonExistingID := "1ae616c3-6b55-471b-9d9b-b83c0000c4fa"
	tests := []struct {
		id       string
		respCode int
	}{
		{mock.TestID, 200},
		{nonExistingID, 404},
	}

	for _, test := range tests {
		// Create a request to pass to our handler. We don't have any query parameters for now, so we'll
		// pass 'nil' as the third parameter.
		req, err := http.NewRequest("GET", "/applications/"+test.id, nil)
		if err != nil {
			t.Fatal(err)
		}

		ctx := req.Context()
		ctx = context.WithValue(ctx, reqIDContextKey("req_id"), "abc123")

		req = req.WithContext(ctx)

		rr := httptest.NewRecorder()
		testRouter.Handle("/applications/{id}",
			testServer.handleGetApplication()).Methods("GET")

		testRouter.ServeHTTP(rr, req)

		assert.Equal(t, test.respCode, rr.Code)
	}
}
