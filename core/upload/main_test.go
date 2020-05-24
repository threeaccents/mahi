package upload

import (
	"bytes"
	"io"
	"mime/multipart"
	"net/http"
	"os"
	"strconv"
	"strings"
	"testing"

	"github.com/threeaccents/mahi"
	"github.com/threeaccents/mahi/mock"
)

const (
	testUploadID      = "test-upload-id"
	testChunkNumber   = int32(1)
	testTotalChunks   = int32(5)
	testTotalFileSize = int64(55)
	testFilename      = "test-filename"
	testChunkData     = "test-chunk-data"
)

var (
	testFileService        mahi.FileService
	testApplicationService mahi.ApplicationService

	testService *Service
)

func TestMain(m *testing.M) {
	testFileService = &mock.FileService{}
	testApplicationService = &mock.ApplicationService{}

	testService = &Service{
		FileService:        testFileService,
		ApplicationService: testApplicationService,
	}

	os.Exit(m.Run())
}

func makeTestMultipartReader() *multipart.Reader {
	buf := new(bytes.Buffer)

	writer := multipart.NewWriter(buf)

	// 1. upload id
	// 2. chunk number
	// 3. total chunks
	// 4. total file size
	// 5. file name
	// 6. chunk data

	part, err := writer.CreateFormField("upload_id")
	if err != nil {
		panic(err)
	}

	part.Write([]byte(testUploadID))

	part, err = writer.CreateFormField("chunk_number")
	if err != nil {
		panic(err)
	}

	if _, err := io.Copy(part, strings.NewReader(strconv.FormatInt(int64(testChunkNumber), 10))); err != nil {
		panic(err)
	}

	part, err = writer.CreateFormField("total_chunks")
	if err != nil {
		panic(err)
	}

	if _, err := io.Copy(part, strings.NewReader(strconv.FormatInt(int64(testTotalChunks), 10))); err != nil {
		panic(err)
	}

	part, err = writer.CreateFormField("total_file_size")
	if err != nil {
		panic(err)
	}

	if _, err := io.Copy(part, strings.NewReader(strconv.FormatInt(testTotalFileSize, 10))); err != nil {
		panic(err)
	}

	part, err = writer.CreateFormField("file_name")
	if err != nil {
		panic(err)
	}

	part.Write([]byte(testFilename))

	part, err = writer.CreateFormField("upload_id")
	if err != nil {
		panic(err)
	}

	part.Write([]byte(testUploadID))

	part, err = writer.CreateFormField("data")
	if err != nil {
		panic(err)
	}

	part.Write([]byte(testChunkData))

	if err := writer.Close(); err != nil {
		panic(err)
	}

	request, err := http.NewRequest("POST", "/", buf)
	if err != nil {
		panic(err)
	}
	request.Header.Add("Content-Type", writer.FormDataContentType())

	r, err := request.MultipartReader()
	if err != nil {
		panic(err)
	}

	return r
}
