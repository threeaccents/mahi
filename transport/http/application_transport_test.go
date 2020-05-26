package http

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/threeaccents/mahi"
	"syreclabs.com/go/faker"

	"context"

	"github.com/stretchr/testify/assert"
)

func TestHandleCreateApplication(t *testing.T) {
	completeRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}
	noDescriptionRequest := &createApplicationRequest{Name: faker.Name().String(), StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}
	nameMissingRequest := &createApplicationRequest{Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}
	accessKeyMissingRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}
	secretKeyMissingRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageEngine: mahi.StorageEngineS3}
	regionMissingRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}
	engineMissingRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test"}
	wrongEngineRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: "wrong-engine"}
	wrongJSONRequest := &testBadJSON{Name: 1}

	tests := []struct {
		payload     interface{}
		respCode    int
		description string
	}{
		{completeRequest, http.StatusCreated, "application should be created"},
		{noDescriptionRequest, http.StatusCreated, "application should be created without a description"},
		{nameMissingRequest, http.StatusBadRequest, "name is required"},
		{accessKeyMissingRequest, http.StatusBadRequest, "accessKey is required"},
		{secretKeyMissingRequest, http.StatusBadRequest, "secretKey is required"},
		{regionMissingRequest, http.StatusBadRequest, "region is required"},
		{engineMissingRequest, http.StatusBadRequest, "engine is required"},
		{wrongEngineRequest, http.StatusBadRequest, "correct engine is required"},
		{wrongJSONRequest, http.StatusBadRequest, "incorrect json format should fail"},
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
	completeRequest := &createApplicationRequest{Name: faker.Name().String(), Description: "test", StorageRegion: "test", StorageAccessKey: "test", StorageSecretKey: "test", StorageEngine: mahi.StorageEngineS3}

	b, err := json.Marshal(completeRequest)
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
	assert.Equal(t, completeRequest.Name, payload.Data.Name, "name should be equal to request")
	assert.Equal(t, completeRequest.Description, payload.Data.Description, "Description should be equal to request")
	assert.Equal(t, completeRequest.StorageAccessKey, payload.Data.StorageAccessKey, "StorageAccessKey should be equal to request")
	assert.Equal(t, completeRequest.StorageRegion, payload.Data.StorageRegion, "StorageRegion should be equal to request")
}
