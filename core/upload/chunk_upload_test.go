package upload

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestService_ParseChunk(t *testing.T) {
	expectedUploadDir := fmt.Sprintf("%s/%s", testService.ChunkUploadDir, testUploadID)

	chunk, err := testService.parseChunk(makeTestMultipartReader())
	if err != nil {
		t.Error(err)
		return
	}

	assert.Equal(t, chunk.UploadID, testUploadID, "chunk UploadId should be equal")
	assert.Equal(t, chunk.ChunkNumber, testChunkNumber, "chunk ChunkNumber should be equal")
	assert.Equal(t, chunk.TotalChunks, testTotalChunks, "chunk TotalChunks should be equal")
	assert.Equal(t, chunk.TotalFileSize, testTotalFileSize, "chunk TotalFileSize should be equal")
	assert.Equal(t, chunk.Filename, testFilename, "chunk Filename should be equal")
	assert.Equal(t, chunk.UploadDir, expectedUploadDir, "chunk Filename should be equal")
	assert.NotNil(t, chunk.Data, "chunk data  should not be nil")
}
