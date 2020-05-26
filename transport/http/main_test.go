package http

import (
	"os"
	"testing"

	"github.com/gorilla/mux"
	"github.com/threeaccents/mahi/mock"
)

type testBadJSON struct {
	Name int `json:"name"`
}

var testServer *Server
var testRouter *mux.Router

func TestMain(m *testing.M) {
	testServer = &Server{
		ApplicationService: &mock.ApplicationService{},
	}

	testRouter = mux.NewRouter()

	t := m.Run()

	os.Exit(t)
}
