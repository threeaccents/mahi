package upload

import (
	"bytes"
	"fmt"
	"image"
	"io"
	"mime/multipart"
	"os"
	"strings"
	"time"

	"github.com/gabriel-vasile/mimetype"

	"github.com/gosimple/slug"
)

func getPart(expectedPart string, reader *multipart.Reader, buf *bytes.Buffer) error {
	part, err := reader.NextPart()
	if err != nil {
		return fmt.Errorf("failed reading %s part %w", expectedPart, err)
	}

	if part.FormName() != expectedPart {
		return fmt.Errorf("invalid form name for part. Expected %s got %s", expectedPart, part.FormName())
	}

	if _, err := io.Copy(buf, part); err != nil {
		return fmt.Errorf("failed copying %s part %w", expectedPart, err)
	}

	return nil
}

func makeFileBlobID(t time.Time, appname, filename string) string {
	s := fmt.Sprintf("%s/%d/%s", slug.Make(appname), t.UnixNano(), filename)

	id := strings.Replace(s, " ", "-", -1)
	lowerCaseID := strings.ToLower(id)

	return strings.Split(lowerCaseID, ".")[0]
}

func imageConfig(fullFile *os.File) (image.Config, error) {
	if _, err := fullFile.Seek(0, 0); err != nil {
		return image.Config{}, err
	}

	img, _, err := image.DecodeConfig(fullFile)
	if err != nil {
		return image.Config{}, err
	}
	return img, nil
}

func mimeType(f *os.File) (*mimetype.MIME, string, error) {
	if _, err := f.Seek(0, 0); err != nil {
		return nil, "", err
	}

	fileHead := make([]byte, 261)

	if _, err := f.Read(fileHead); err != nil {
		return nil, "", err
	}

	mime := mimetype.Detect(fileHead)

	extSlice := strings.Split(mime.Extension(), ".")
	ext := "bin"
	if len(extSlice) > 1 {
		ext = extSlice[1]
	}

	return mime, ext, nil
}
