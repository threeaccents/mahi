package mock

import "github.com/threeaccents/mahi"

type ApplicationService struct {
}

func (s *ApplicationService) Create(n *mahi.NewApplication) (*mahi.Application, error) {
	return &mahi.Application{}, nil
}

func (s *ApplicationService) Application(slug string) (*mahi.Application, error) {
	return &mahi.Application{}, nil
}

func (s *ApplicationService) Applications(sinceID string, limit int) ([]*mahi.Application, error) {
	return []*mahi.Application{}, nil
}

func (s *ApplicationService) Delete(id string) error {
	return nil
}

func (s *ApplicationService) Update(u *mahi.UpdateApplication) (*mahi.Application, error) {
	return &mahi.Application{}, nil
}

func (s *ApplicationService) BlobStorage(id string) (mahi.FileBlobStorage, error) {
	return &FileBlobStorage{}, nil
}
