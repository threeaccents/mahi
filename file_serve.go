package mahi

import "net/http"

// FileServeService handles serving the file over http
type FileServeService interface {
	Serve(r *http.Request) (*FileBlob, error)
}
