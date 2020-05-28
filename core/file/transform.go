package file

import (
	"bytes"
	"context"
	"fmt"
	"io/ioutil"

	"github.com/threeaccents/mahi"
	"gopkg.in/h2non/bimg.v1"
)

type TransformService struct {
	MaxTransformFileSize int64
}

func (s *TransformService) Transform(ctx context.Context, blob *mahi.FileBlob, opts mahi.TransformationOption) (*mahi.FileBlob, error) {
	if !blob.IsTransformable() {
		return blob, nil
	}

	if blob.Size > s.MaxTransformFileSize {
		return nil, mahi.ErrFileToLargeToTransform
	}

	transformedBlob, err := transform(blob, opts)
	if err != nil {
		return nil, err
	}

	return transformedBlob, nil
}

func transform(blob *mahi.FileBlob, opts mahi.TransformationOption) (*mahi.FileBlob, error) {
	bimgOpts := convertBimgOptions(opts)

	f := new(mahi.FileBlob)

	blobBytes := make([]byte, blob.Size)
	if _, err := blob.Bytes(blobBytes); err != nil {
		return nil, err
	}

	transformedFileBlob, err := bimg.Resize(blobBytes, bimgOpts)
	if err != nil {
		return nil, fmt.Errorf("failed to process image transformation %w", err)
	}

	f.Size = int64(len(transformedFileBlob))
	f.Data = ioutil.NopCloser(bytes.NewReader(transformedFileBlob))
	f.MIMEValue = getMimeValue(opts.Format)

	return f, nil
}

func getMimeValue(format string) string {
	var fileFormat string

	switch format {
	case "jpeg":
		fileFormat = "image/jpeg"
		break
	case "jpg":
		fileFormat = "image/jpeg"
		break
	case "png":
		fileFormat = "image/png"
		break
	case "webp":
		fileFormat = "image/webp"
		break
	default:
		fileFormat = "image/jpeg"
		break
	}

	return fileFormat
}

func convertBimgOptions(opts mahi.TransformationOption) bimg.Options {
	var fileType bimg.ImageType

	switch opts.Format {
	case "jpeg":
		fileType = bimg.JPEG
		break
	case "jpg":
		fileType = bimg.JPEG
		break
	case "png":
		fileType = bimg.PNG
		break
	case "webp":
		fileType = bimg.WEBP
		break
	default:
		fileType = bimg.JPEG
	}

	o := bimg.Options{
		Width:   opts.Width,
		Height:  opts.Height,
		Gravity: bimg.GravitySmart, // smart crop
		Type:    fileType,
	}

	return o
}
