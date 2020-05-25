package postgre

import (
	"context"
	"log"
	"os"
	"testing"

	"syreclabs.com/go/faker"

	uuid "github.com/satori/go.uuid"

	"github.com/threeaccents/mahi"

	"github.com/jackc/pgx/v4/pgxpool"
)

const (
	testApplicationName = "test-app"
)

var (
	testApplicationStorage *ApplicationStorage
	testFileStorage        *FileStorage

	testApplication          *mahi.Application
	testDeletableApplication *mahi.Application
	testFile                 *mahi.File
	testDeletableFile        *mahi.File
)

func TestMain(m *testing.M) {
	db, err := pgxpool.Connect(context.Background(), os.Getenv("MAHI_DATABASE_URL"))
	if err != nil {
		log.Println("failed setting up db connection", err)
		return
	}

	setup(db)

	t := m.Run()

	os.Exit(t)
}

func setup(db *pgxpool.Pool) {
	testApplicationStorage = &ApplicationStorage{
		DB: db,
	}

	testFileStorage = &FileStorage{
		DB: db,
	}

	createTestApplication(db)
	testApplication = createTestApplication(db)
	testDeletableApplication = createTestApplication(db)

	createTestFile(db)
	testFile = createTestFile(db)
	testDeletableFile = createTestFile(db)

}

func createTestApplication(db *pgxpool.Pool) *mahi.Application {
	a := &mahi.Application{
		ID:               uuid.NewV4().String(),
		Name:             faker.Name().String(),
		Description:      "",
		StorageEngine:    testStorageEngine,
		StorageAccessKey: testStorageAccessKey,
		StorageSecretKey: testStorageSecretKey,
		StorageBucket:    testStorageBucket,
		StorageEndpoint:  testStorageEndpoint,
		StorageRegion:    testStorageRegion,
		DeliveryURL:      testDeliveryURL,
	}

	query := `
		INSERT INTO mahi_applications (id, name, description, storage_engine, storage_access_key, storage_secret_key, storage_bucket,
									   storage_endpoint, storage_region, delivery_url)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
 `

	if _, err := db.Exec(
		context.Background(),
		query,
		NewNullString(a.ID),
		NewNullString(a.Name),
		NewNullString(a.Description),
		NewNullString(a.StorageEngine),
		NewNullString(a.StorageAccessKey),
		NewNullString(a.StorageSecretKey),
		NewNullString(a.StorageBucket),
		NewNullString(a.StorageEndpoint),
		NewNullString(a.StorageRegion),
		NewNullString(a.DeliveryURL),
	); err != nil {
		panic(err)
	}

	return a
}

func createTestFile(db *pgxpool.Pool) *mahi.File {
	n := &mahi.File{
		ID:            uuid.NewV4().String(),
		ApplicationID: testApplication.ID,
		Filename:      faker.Name().String(),
		FileBlobID:    faker.Name().String(),
		Size:          50,
		MIMEType:      "test",
		MIMEValue:     "test",
		Extension:     "test",
		URL:           faker.Name().String(),
		Hash:          "test",
		Width:         23,
		Height:        60,
	}

	query := `
		INSERT INTO mahi_files (id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
		RETURNING id, application_id, file_blob_id, filename, size, mime_type, mime_value, extension,
									   url, hash, width, height, created_at, updated_at
 `

	if _, err := db.Exec(
		context.Background(),
		query,
		NewNullString(n.ID),
		NewNullString(n.ApplicationID),
		NewNullString(n.FileBlobID),
		NewNullString(n.Filename),
		NewNullInt64(n.Size),
		NewNullString(n.MIMEType),
		NewNullString(n.MIMEValue),
		NewNullString(n.Extension),
		NewNullString(n.URL),
		NewNullString(n.Hash),
		NewNullInt64(int64(n.Width)),
		NewNullInt64(int64(n.Height)),
	); err != nil {
		panic(err)
	}

	return n
}
