package upload

import (
	"context"
	"fmt"
	"image"
	"os"
	"strings"
	"time"

	_ "image/jpeg"
	_ "image/png"

	"github.com/gabriel-vasile/mimetype"
	"github.com/gosimple/slug"
	"github.com/threeaccents/mahi"
)

func (s *Service) processUpload(ctx context.Context, u *uploadData) (*mahi.File, error) {
	app, err := s.ApplicationService.Application(ctx, u.ApplicationID)
	if err != nil {
		return nil, err
	}

	mime, ext, err := mimeType(u.File)
	if err != nil {
		return nil, fmt.Errorf("failed getting mime type %w", err)
	}

	fileBlobID := makeFileBlobID(time.Now(), app.Name, u.Filename)

	newFile := &mahi.NewFile{
		ApplicationID: app.ID,
		Filename:      u.Filename,
		FileBlobID:    fileBlobID,
		MIMEType:      strings.Split(mime.String(), "/")[0],
		MIMEValue:     mime.String(),
		Extension:     ext,
		Size:          u.Size,
		Hash:          "",
		URL:           fmt.Sprintf("%s/%s.%s", app.DeliveryURL, fileBlobID, ext),
	}

	if newFile.IsImage() {
		img, err := imageConfig(u.File)
		if err != nil {
			return nil, err
		}

		newFile.Width = img.Width
		newFile.Height = img.Height
	}

	if _, err := u.File.Seek(0, 0); err != nil {
		return nil, err
	}

	fileBlob := &mahi.FileBlob{
		ID:        newFile.FileBlobID,
		Data:      u.File,
		MIMEValue: newFile.MIMEValue,
		Size:      newFile.Size,
	}

	fileBlobStorage, err := s.ApplicationService.FileBlobStorage(app.StorageEngine, app.StorageAccessKey, app.StorageSecretKey, app.StorageRegion, app.StorageEndpoint)
	if err != nil {
		return nil, err
	}

	if err := fileBlobStorage.Upload(ctx, app.StorageBucket, fileBlob); err != nil {
		return nil, fmt.Errorf("failed uploading file blob to storage %w", err)
	}

	f, err := s.FileService.Create(ctx, newFile)
	if err != nil {
		return nil, fmt.Errorf("could not store file %w", err)
	}

	updatedUsage := &mahi.UpdateUsage{
		ApplicationID: f.ApplicationID,
		Storage:       f.Size,
		FileCount:     1,
	}

	if err := s.UsageService.Update(ctx, updatedUsage); err != nil {
		s.Log.Error().Err(err).Msg("failed updating usage")
	}

	return f, nil
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
