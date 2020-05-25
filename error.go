package mahi

// General errors.
const (
	ErrUnauthorized = Error("unauthorized")
	ErrInternal     = Error("internal error")
	ErrNotFound     = Error("resource not found")
	ErrBadRequest   = Error("bad request")
	ErrInvalidJSON  = Error("invalid json")
)

// Application errors
const (
	ErrApplicationNotFound = Error("application not found")
)

// Storage errors
const (
	ErrBucketNotFound    = Error("bucket does not exist")
	ErrInvalidBucketName = Error("invalid bucket name")
	ErrInvalidStorageKey = Error("invalid api keys or api keys do not have correct permissions")
)

// File errors
const (
	ErrFileNotFound           = Error("file not found")
	ErrStorageNotSet          = Error("storage not set")
	ErrFileToLargeToTransform = Error("file is to large to transform. Max file size is 50MB")
	ErrImageToLargeToTag      = Error("image is to large to tag. Max image size is 50MB")
	ErrFileNotImage           = Error("file is not an image")
)

// Error represents a Mahi error.
type Error string

// Error returns the error message.
func (e Error) Error() string {
	return string(e)
}