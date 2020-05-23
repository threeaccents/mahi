package mahi

import "net/url"

// FileServeService handles serving the file over http
type FileServeService interface {
	Serve(path *url.URL) (*FileBlob, error)
}
