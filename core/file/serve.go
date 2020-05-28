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

func (s *ServeService) Serve(ctx context.Context, u *url.URL, opts mahi.TransformationOption) (*mahi.FileBlob, error) {
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

	if !shouldTransform(file, opts) {
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

func shouldTransform(file *mahi.File, opts mahi.TransformationOption) bool {
	return opts.Width > 0 ||
		opts.Height > 0 ||
		opts.Format != file.Extension
}

func getFileBlobID(urlPath string) string {
	path := strings.TrimPrefix(urlPath, "/")
	return strings.Split(path, ".")[0]
}
