package file

import (
	"context"
	"fmt"
	"net/url"
	"strings"

	"github.com/gorilla/schema"

	"github.com/threeaccents/mahi"
)

type ServeService struct {
	FileStorage mahi.FileStorage

	ApplicationService mahi.ApplicationService
	TransformService   mahi.TransformService

	FullFileDir string

	QueryDecoder *schema.Decoder
}

type serveFileQueryParam struct {
	Width  int `schema:"width"`
	Height int `schema:"height"`
}

func (s *ServeService) Serve(ctx context.Context, u *url.URL) (*mahi.FileBlob, error) {
	fileBlobID := getFileBlobID(u.Path)

	file, err := s.FileStorage.FileByFileBlobID(ctx, fileBlobID)
	if err != nil {
		return nil, err
	}

	app, err := s.ApplicationService.Application(ctx, file.ApplicationID)
	if err != nil {
		return nil, err
	}

	fileBlobStorage, err := s.ApplicationService.FileBlobStorage(app.StorageEngine, app.StorageAccessKey, app.StorageSecretKey, app.StorageRegion, app.StorageEndpoint)
	if err != nil {
		return nil, err
	}

	fileBlob, err := fileBlobStorage.FileBlob(ctx, app.StorageBucket, fileBlobID, s.FullFileDir)
	if err != nil {
		return nil, fmt.Errorf("could not get file blob %w", err)
	}

	opts, err := s.parseTransformationOptions(file, u)
	if err != nil {
		// should I just return the original file?
		return nil, err
	}

	if opts == nil {
		return fileBlob, nil
	}

	// we can close the original fileBlob since we will be transforming it and generating a new one.
	defer fileBlob.Close()

	transformedFile, err := s.TransformService.Transform(ctx, fileBlob, opts)
	if err != nil {
		return nil, err
	}

	return transformedFile, nil
}

func (s *ServeService) parseTransformationOptions(f *mahi.File, u *url.URL) (*mahi.TransformationOption, error) {
	extension := getFileExtension(u)

	if !hasQueryParams(u) && extension == f.Extension {
		return nil, nil
	}

	if !f.IsImage() {
		return &mahi.TransformationOption{Format: extension}, nil
	}

	var queryParams serveFileQueryParam
	if err := s.QueryDecoder.Decode(&queryParams, u.Query()); err != nil {
		return nil, fmt.Errorf("failed to decode query params %w", err)
	}

	opts := &mahi.TransformationOption{
		Width:  queryParams.Width,
		Height: queryParams.Height,
	}

	if extension != f.Extension {
		opts.Format = extension
	}

	return opts, nil
}

func hasQueryParams(u *url.URL) bool {
	return len(u.RawQuery) > 3
}

func getFileExtension(u *url.URL) string {
	return strings.Split(u.Path, ".")[1]
}

func getFileBlobID(urlPath string) string {
	path := strings.TrimPrefix(urlPath, "/")
	return strings.Split(path, ".")[0]
}
