package mahi

import (
	"context"
	"net/url"
)

// FileServeService handles serving the file over http
type FileServeService interface {
	Serve(ctx context.Context, path *url.URL) (*FileBlob, error)
}
