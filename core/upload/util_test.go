package upload

import (
	"fmt"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestMakeFileBlobID(t *testing.T) {
	testAppName := "Test App"
	testFileName := "My Test_File.jpg"
	testTime := time.Now()

	expectedAppName := "test-app"
	expectedFileName := "my-test_file"

	expectedFileBlobID := fmt.Sprintf("%s/%d/%s", expectedAppName, testTime.UnixNano(), expectedFileName)

	fileBlobID := makeFileBlobID(testTime, testAppName, testFileName)

	assert.Equal(t, fileBlobID, expectedFileBlobID, "fileBlobID should be equal to expectedFileBlobID")
}
