package file

import "github.com/threeaccents/mahi"

// Service is the implementation of the file service interface.
// It will handle the apps business logic concerning files.
type Service struct {
	FileStorage     mahi.FileStorage
	FileBlobStorage mahi.FileBlobStorage
}
