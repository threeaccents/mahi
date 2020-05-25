package postgre

import (
	"context"
	"testing"

	"syreclabs.com/go/faker"

	"github.com/stretchr/testify/assert"
	"github.com/threeaccents/mahi"
)

func TestFileStorage_Store(t *testing.T) {
	completeFile := &mahi.NewFile{ApplicationID: testApplication.ID, Filename: faker.Name().String(), FileBlobID: "test", Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Hash: "test", Width: 50, Height: 50}
	completeFileWithNoHash := &mahi.NewFile{ApplicationID: testApplication.ID, Filename: faker.Name().String(), FileBlobID: "test", Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Width: 50, Height: 50}
	completeFileWithNoWidthAndHeight := &mahi.NewFile{ApplicationID: testApplication.ID, Filename: faker.Name().String(), FileBlobID: "test", Size: faker.RandomInt64(100, 999999), MIMEType: "test", MIMEValue: "test", Extension: "test", URL: faker.Name().String(), Hash: "test"}
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
