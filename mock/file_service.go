package mock

import "github.com/threeaccents/mahi"

type FileService struct {
}

func (s *FileService) Create(n *mahi.NewFile) (*mahi.File, error) {
	return &mahi.File{}, nil
}

func (s *FileService) File(id string) (*mahi.File, error) {
	return &mahi.File{}, nil
}

func (s *FileService) Files(sinceID string, limit int) ([]*mahi.File, error) {
	return []*mahi.File{}, nil
}

func (s *FileService) Delete(id string) error {
	return nil
}
