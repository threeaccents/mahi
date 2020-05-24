package mock

import "github.com/threeaccents/mahi"

type FileBlobStorage struct {
}

func (s *FileBlobStorage) Upload(bucket string, blob *mahi.FileBlob) error {
	return nil
}
