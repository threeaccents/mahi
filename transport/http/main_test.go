package http

import (
	"os"
	"testing"

	"github.com/rs/zerolog"

	"github.com/gorilla/schema"
	"github.com/threeaccents/mahi/mock"

	"github.com/gorilla/mux"
)

type testBadJSON struct {
	Name int `json:"name"`
}

var (
	nonExistingID = "1ae616c3-6b55-471b-9d9b-b83c0000c4fa"
	testServer    *Server
	testRouter    *mux.Router
)

func TestMain(m *testing.M) {
	testServer = NewServer(&ServerConfig{
		ApplicationService: &mock.ApplicationService{},
		QueryDecoder:       schema.NewDecoder(),
		Log:                zerolog.Logger{},
	})

	testRouter = mux.NewRouter()

	t := m.Run()

	os.Exit(t)
}
