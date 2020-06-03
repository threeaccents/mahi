package bolt

import (
	"context"
	"testing"

	"syreclabs.com/go/faker"

	uuid "github.com/satori/go.uuid"
	"github.com/stretchr/testify/assert"
	"github.com/threeaccents/mahi"
)

func TestFileStorage_Store(t *testing.T) {
	completeFile := &mahi.NewFile{ApplicationID: testApplication.ID, Filename: faker.Name().String(), FileBlobID: faker.Name().String(), Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Hash: "test", Width: 50, Height: 50}
	completeFileWithNoHash := &mahi.NewFile{ApplicationID: testApplication.ID, Filename: faker.Name().String(), FileBlobID: faker.Name().String(), Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Width: 50, Height: 50}
	completeFileWithNoWidthAndHeight := &mahi.NewFile{ApplicationID: testApplication.ID, Filename: faker.Name().String(), FileBlobID: faker.Name().String(), Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Hash: "test"}
	NoNameFile := &mahi.NewFile{ApplicationID: testApplication.ID, FileBlobID: "test", Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Hash: "test", Width: 50, Height: 50}

	tests := []struct {
		newFile     *mahi.NewFile
		expected    bool
		description string
	}{
		{completeFile, true, "file should be inserted"},
		{completeFileWithNoHash, true, "file should be inserted with no hash"},
		{completeFileWithNoWidthAndHeight, true, "file should be inserted with no width and height"},
		{NoNameFile, false, "name cannot be null"},
	}

	ctx := context.Background()

	for _, test := range tests {
		f, err := testFileStorage.Store(ctx, test.newFile)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
			return
		}

		if err == nil {
			assert.NotNil(t, f.ID, test.description)
			assert.NotNil(t, f.CreatedAt, test.description)
			assert.NotNil(t, f.UpdatedAt, test.description)
			assert.Equal(t, test.newFile.ApplicationID, f.ApplicationID, "ApplicationID should be equal", test.description)
			assert.Equal(t, test.newFile.Filename, f.Filename, "Filename should be equal", test.description)
			assert.Equal(t, test.newFile.FileBlobID, f.FileBlobID, "FileBlobID should be equal", test.description)
			assert.Equal(t, test.newFile.Size, f.Size, "Size should be equal", test.description)
			assert.Equal(t, test.newFile.MIMEType, f.MIMEType, "MIMEType should be equal", test.description)
			assert.Equal(t, test.newFile.MIMEValue, f.MIMEValue, "MIMEValue should be equal", test.description)
			assert.Equal(t, test.newFile.Extension, f.Extension, "Extension should be equal", test.description)
			assert.Equal(t, test.newFile.Hash, f.Hash, "Hash should be equal", test.description)
			assert.Equal(t, test.newFile.URL, f.URL, "URL should be equal", test.description)
			assert.Equal(t, test.newFile.Width, f.Width, "Width should be equal", test.description)
			assert.Equal(t, test.newFile.Height, f.Height, "Height should be equal", test.description)
		}
	}
}

func TestFileStorage_File(t *testing.T) {
	nonExistentID := uuid.NewV4().String()
	existentID := testFile.ID
	notUUID := "hello"

	tests := []struct {
		id          string
		expected    bool
		description string
		errType     interface{}
	}{
		{existentID, true, "file should be returned", nil},
		{nonExistentID, false, "file with wrong id should return err", mahi.ErrFileNotFound},
		{notUUID, false, "file with invalid uuid should return error", nil},
	}

	ctx := context.Background()

	for _, test := range tests {
		f, err := testFileStorage.File(ctx, test.id)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
		}

		if test.errType != nil {
			assert.Equal(t, err, mahi.ErrFileNotFound, "error should be mahi.ErrFileNotFound")
		}

		if err == nil {
			assert.Equal(t, testFile.ID, f.ID, "ID should be equal", test.description)
			assert.Equal(t, testFile.ApplicationID, f.ApplicationID, "ApplicationID should be equal", test.description)
			assert.Equal(t, testFile.Filename, f.Filename, "Filename should be equal", test.description)
			assert.Equal(t, testFile.FileBlobID, f.FileBlobID, "FileBlobID should be equal", test.description)
			assert.Equal(t, testFile.Size, f.Size, "Size should be equal", test.description)
			assert.Equal(t, testFile.MIMEType, f.MIMEType, "MIMEType should be equal", test.description)
			assert.Equal(t, testFile.MIMEValue, f.MIMEValue, "MIMEValue should be equal", test.description)
			assert.Equal(t, testFile.Extension, f.Extension, "Extension should be equal", test.description)
			assert.Equal(t, testFile.Hash, f.Hash, "Hash should be equal", test.description)
			assert.Equal(t, testFile.URL, f.URL, "URL should be equal", test.description)
			assert.Equal(t, testFile.Width, f.Width, "Width should be equal", test.description)
			assert.Equal(t, testFile.Height, f.Height, "Height should be equal", test.description)

		}
	}
}

func TestFileStorage_FileByFileBlobID(t *testing.T) {
	nonExistentID := uuid.NewV4().String()
	existentID := testFile.FileBlobID

	tests := []struct {
		id          string
		expected    bool
		description string
		errType     interface{}
	}{
		{existentID, true, "file should be returned", nil},
		{nonExistentID, false, "file with wrong id should return err", mahi.ErrFileNotFound},
	}

	ctx := context.Background()

	for _, test := range tests {
		f, err := testFileStorage.FileByFileBlobID(ctx, test.id)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
		}

		if test.errType != nil {
			assert.Equal(t, err, mahi.ErrFileNotFound, "error should be mahi.ErrFileNotFound")
		}

		if err == nil {
			assert.Equal(t, testFile.ID, f.ID, "ID should be equal", test.description)
			assert.Equal(t, testFile.ApplicationID, f.ApplicationID, "ApplicationID should be equal", test.description)
			assert.Equal(t, testFile.Filename, f.Filename, "Filename should be equal", test.description)
			assert.Equal(t, testFile.FileBlobID, f.FileBlobID, "FileBlobID should be equal", test.description)
			assert.Equal(t, testFile.Size, f.Size, "Size should be equal", test.description)
			assert.Equal(t, testFile.MIMEType, f.MIMEType, "MIMEType should be equal", test.description)
			assert.Equal(t, testFile.MIMEValue, f.MIMEValue, "MIMEValue should be equal", test.description)
			assert.Equal(t, testFile.Extension, f.Extension, "Extension should be equal", test.description)
			assert.Equal(t, testFile.Hash, f.Hash, "Hash should be equal", test.description)
			assert.Equal(t, testFile.URL, f.URL, "URL should be equal", test.description)
			assert.Equal(t, testFile.Width, f.Width, "Width should be equal", test.description)
			assert.Equal(t, testFile.Height, f.Height, "Height should be equal", test.description)

		}
	}
}

func TestFileStorage_ApplicationFiles(t *testing.T) {
	tests := []struct {
		sinceID     string
		expected    bool
		description string
	}{
		{"", true, "files should be returned"},
		{testFile.ID, true, "files should be returned when paginated"},
	}

	for _, test := range tests {
		a, err := testFileStorage.ApplicationFiles(context.Background(), testApplication.ID, test.sinceID, 10)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test %s. error %v", test.description, err)
		}

		if err == nil {
			if !assert.NotEmpty(t, a) {
				t.Errorf("test %s. error at least 1 file should be returned", test.description)
			}
		}
	}
}

func TestFileStorage_Delete(t *testing.T) {
	nonExistentID := uuid.NewV4().String()
	existentID := testDeletableFile.ID
	notUUID := "hello"

	tests := []struct {
		id          string
		expected    bool
		description string
		errType     interface{}
	}{
		{existentID, true, "file should be returned", nil},
		{nonExistentID, false, "file with wrong id should return err", mahi.ErrFileNotFound},
		{notUUID, false, "file with invalid uuid should return error", nil},
	}

	ctx := context.Background()

	for _, test := range tests {
		err := testFileStorage.Delete(ctx, test.id)
		result := err == nil

		if !assert.Equal(t, test.expected, result) {
			t.Errorf("test: %s. error: %v", test.description, err)
		}

		if test.errType != nil {
			assert.Equal(t, err, mahi.ErrFileNotFound, "error should be mahi.ErrFileNotFound")
		}
	}
}
