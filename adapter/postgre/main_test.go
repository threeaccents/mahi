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

	testApplication          *mahi.Application
	testDeletableApplication *mahi.Application
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

	testApplication = createTestApplication(db)
	testDeletableApplication = createTestApplication(db)
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
