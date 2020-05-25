package postgre

import (
	"context"
	"log"
	"os"
	"testing"

	"github.com/jackc/pgx/v4/pgxpool"
)

const (
	testApplicationName = "test-app"
)

var (
	testApplicationStorage *ApplicationStorage
)

func TestMain(m *testing.M) {
	os.Setenv("MAHI_DATABASE_URL", "postgresql://rodrigolessa@localhost/mahi")
	db, err := pgxpool.Connect(context.Background(), os.Getenv("MAHI_DATABASE_URL"))
	if err != nil {
		log.Println("failed setting up db connection", err)
		return
	}

	testApplicationStorage = &ApplicationStorage{
		DB: db,
	}

	t := m.Run()

	os.Exit(t)
}
