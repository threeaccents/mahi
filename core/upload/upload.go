package upload

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"

	"github.com/threeaccents/mahi"
)

type uploadData struct {
	File          *os.File
	ApplicationID string
	Size          int64
	Filename      string
}

func (s *Service) Upload(ctx context.Context, r *multipart.Reader) (*mahi.File, error) {
	u, err := s.parseUploadData(r)
	if err != nil {
		return nil, fmt.Errorf("failed parsing form data %w", err)
	}
	defer func() {
		if err := u.File.Close(); err != nil {
			s.Log.Error().Err(err).Msg("closing removing tmp file")
		}
		if err := os.Remove(u.File.Name()); err != nil {
			s.Log.Error().Err(err).Msg("failed removing tmp file")
		}
	}()

	return s.processUpload(ctx, u)
}

func (s *Service) parseUploadData(reader *multipart.Reader) (*uploadData, error) {
	var u uploadData

	buf := new(bytes.Buffer)

	// start readings parts
	// 1. application_id
	// 2. file name
	// 3. file

	// 1
	if err := getPart("application_id", reader, buf); err != nil {
		return nil, err
	}

	u.ApplicationID = buf.String()
	buf.Reset()

	if err := getPart("file_name", reader, buf); err != nil {
		return nil, err
	}

	u.Filename = buf.String()
	buf.Reset()

	part, err := reader.NextPart()
	if err != nil {
		return nil, fmt.Errorf("failed reading chunk part %w", err)
	}

	file, err := ioutil.TempFile("", "mahi-")
	if err != nil {
		return nil, err
	}

	n, err := io.CopyN(file, part, s.MaxUploadFileSize)
	if err != nil && err != io.EOF {
		return nil, err
	}

	u.Size = n
	u.File = file

	return &u, nil
}
