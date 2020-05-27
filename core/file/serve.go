package file

import (
	"context"
	"fmt"
	"net/url"
	"strings"

	"github.com/threeaccents/mahi"
)

type ServeService struct {
	FileStorage        mahi.FileStorage
	ApplicationService mahi.ApplicationService

	FullFileDir string
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

	return fileBlob, nil
}

func getFileBlobID(urlPath string) string {
	path := strings.TrimPrefix(urlPath, "/")
	return strings.Split(path, ".")[0]
}
