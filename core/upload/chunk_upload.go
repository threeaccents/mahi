package upload

import (
	"bytes"
	"mime/multipart"

	"github.com/threeaccents/mahi"
)

func (s *Service) ChunkUpload(r *multipart.Reader) error {

	return nil
}

func parseChunk(r *multipart.Reader) (*mahi.Chunk, error) {
	var chunk mahi.Chunk

	buf := new(bytes.Buffer)
}
