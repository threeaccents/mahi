package postgre

import (
	"context"
	"log"
	"os"
	"testing"
	"time"

	"github.com/jinzhu/now"
	"syreclabs.com/go/faker"

	"github.com/google/uuid"

	"github.com/threeaccents/mahi"

	"github.com/jackc/pgx/v4/pgxpool"
)

var (
	testApplicationStorage    *ApplicationStorage
	testFileStorage           *FileStorage
	testUsageStorage          *UsageStorage
	testTransformationStorage *TransformStorage

	testUsage                *mahi.Usage
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

	testUsageStorage = &UsageStorage{
		DB: db,
	}

	testTransformationStorage = &TransformStorage{
		DB: db,
	}

	createTestApplication(db)
	testApplication = createTestApplication(db)
	testDeletableApplication = createTestApplication(db)

	createTestFile(db)
	testFile = createTestFile(db)
	testDeletableFile = createTestFile(db)

	deleteUsagesAheadOfToday(db)
	testUsage = createTestUsage(db)

}

func deleteUsagesAheadOfToday(db *pgxpool.Pool) {
	const query = `
		DELETE FROM mahi_usages
		WHERE start_date > $1
		`

	if _, err := db.Exec(context.Background(), query, time.Now()); err != nil {
		panic(err)
	}
}

func createTestUsage(db *pgxpool.Pool) *mahi.Usage {
	u := &mahi.Usage{
		ID:                    uuid.New().String(),
		ApplicationID:         testApplication.ID,
		Transformations:       10,
		UniqueTransformations: 10,
		Bandwidth:             49494,
		Storage:               23232323,
		FileCount:             12,
		StartDate:             now.BeginningOfDay(),
		EndDate:               now.EndOfDay().Add(2 * time.Hour),
	}

	query := `
		INSERT INTO mahi_usages (id, application_id, transformations, unique_transformations, bandwidth, storage, file_count, start_date, end_date)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
 `

	if _, err := db.Exec(
		context.Background(),
		query,
		NewNullString(u.ID),
		NewNullString(u.ApplicationID),
		NewNullInt64(u.Transformations),
		NewNullInt64(u.UniqueTransformations),
		NewNullInt64(u.Bandwidth),
		NewNullInt64(u.Storage),
		NewNullInt64(u.FileCount),
		NewNullTime(u.StartDate),
		NewNullTime(u.EndDate),
	); err != nil {
		panic(err)
	}

	return u
}

func createTestApplication(db *pgxpool.Pool) *mahi.Application {
	a := &mahi.Application{
		ID:               uuid.New().String(),
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
		ID:            uuid.New().String(),
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
