package upload

import (
	"github.com/rs/zerolog"
	"github.com/threeaccents/mahi"
)

type Service struct {
	FileService        mahi.FileService
	ApplicationService mahi.ApplicationService

	ChunkUploadDir string
	FullFileDir    string
	MaxChunkSize   int64
	Host           string

	Log zerolog.Logger
}