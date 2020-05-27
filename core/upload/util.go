package upload

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
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
