package upload

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"io/ioutil"
	"mime/multipart"
	"os"
	"sort"
	"strconv"

	"github.com/threeaccents/mahi"
)

// chunk is a chunk of a file.
// It contains information to be able to put the full file back together
// when all file chunks have been uploaded.
type chunk struct {
	UploadID      string
	ChunkNumber   int32
	TotalChunks   int32
	TotalFileSize int64
	Filename      string
	Data          io.Reader
	UploadDir     string
}

func (s *Service) ChunkUpload(ctx context.Context, r *multipart.Reader) error {
	chunk, err := s.parseChunk(r)
	if err != nil {
		return fmt.Errorf("failed parsing chunk %w", err)
	}

	// There's basically no overhead in calling this for every chunk because if the dir already
	// exists MkdirAll will just ignore it.
	if err := os.MkdirAll(chunk.UploadDir, 02750); err != nil {
		return err
	}

	if err := s.saveChunk(chunk); err != nil {
		return fmt.Errorf("failed saving chunk %w", err)
	}

	return nil
}

func (s *Service) CompleteChunkUpload(ctx context.Context, applicationID, uploadID, filename string) (*mahi.File, error) {
	fullFile, err := s.rebuildFile(uploadID)
	if err != nil {
		return nil, fmt.Errorf("failed to rebuild file %w", err)
	}
	defer func() {
		if err := fullFile.Close(); err != nil {
			s.Log.Error().Err(err).Msg("could not close file")
		}
		if err := os.Remove(fullFile.Name()); err != nil {
			s.Log.Error().Err(err).Msg("could not remove file")
		}
	}()

	stat, err := fullFile.Stat()
	if err != nil {
		return nil, err
	}

	u := &uploadData{
		File:          fullFile,
		ApplicationID: applicationID,
		Filename:      filename,
		Size:          stat.Size(),
	}

	return s.processUpload(ctx, u)
}

func (s *Service) saveChunk(chunk *chunk) error {
	chunkFile, err := os.Create(fmt.Sprintf("%s/%d", chunk.UploadDir, chunk.ChunkNumber))
	if err != nil {
		return err
	}

	if _, err := io.CopyN(chunkFile, chunk.Data, s.MaxChunkSize); err != nil && err != io.EOF {
		return err
	}

	return nil
}

func (s *Service) parseChunk(reader *multipart.Reader) (*chunk, error) {
	var c chunk

	buf := new(bytes.Buffer)

	// start readings parts
	// 1. upload id
	// 2. chunk number
	// 3. total chunks
	// 4. total file size
	// 5. file name
	// 6. chunk data

	if err := getPart("upload_id", reader, buf); err != nil {
		return nil, err
	}

	c.UploadID = buf.String()
	buf.Reset()

	c.UploadDir = fmt.Sprintf("%s/%s", s.ChunkUploadDir, c.UploadID)

	// 2
	if err := getPart("chunk_number", reader, buf); err != nil {
		return nil, err
	}

	parsedChunkNumber, err := strconv.ParseInt(buf.String(), 10, 32)
	if err != nil {
		return nil, err
	}

	c.ChunkNumber = int32(parsedChunkNumber)
	buf.Reset()

	// 3
	if err := getPart("total_chunks", reader, buf); err != nil {
		return nil, err
	}

	parsedTotalChunksNumber, err := strconv.ParseInt(buf.String(), 10, 32)
	if err != nil {
		return nil, err
	}

	c.TotalChunks = int32(parsedTotalChunksNumber)
	buf.Reset()

	// 4
	if err := getPart("total_file_size", reader, buf); err != nil {
		return nil, err
	}

	parsedTotalFileSizeNumber, err := strconv.ParseInt(buf.String(), 10, 64)
	if err != nil {
		return nil, err
	}

	c.TotalFileSize = parsedTotalFileSizeNumber
	buf.Reset()

	// 5
	if err := getPart("file_name", reader, buf); err != nil {
		return nil, err
	}

	c.Filename = buf.String()
	buf.Reset()

	// 6
	part, err := reader.NextPart()
	if err != nil {
		return nil, fmt.Errorf("failed reading chunk part %w", err)
	}

	c.Data = part

	return &c, nil
}

// ByFilename helper struct to sort chunk files.
// Since chunk files are named their chunk number
// it is easy to sort them out.
type ByFilename []os.FileInfo

func (a ByFilename) Len() int      { return len(a) }
func (a ByFilename) Swap(i, j int) { a[i], a[j] = a[j], a[i] }
func (a ByFilename) Less(i, j int) bool {
	ai, _ := strconv.Atoi(a[i].Name())
	aj, _ := strconv.Atoi(a[j].Name())
	return ai < aj
}

func (s *Service) rebuildFile(uploadID string) (*os.File, error) {
	uploadDir := fmt.Sprintf("%s/%s", s.ChunkUploadDir, uploadID)

	fileInfos, err := ioutil.ReadDir(uploadDir)
	if err != nil {
		return nil, err
	}

	fullFile, err := ioutil.TempFile(s.FullFileDir, "mahi-")
	if err != nil {
		return nil, err
	}

	sort.Sort(ByFilename(fileInfos))
	for _, fs := range fileInfos {
		if err := s.appendChunk(uploadDir, fs, fullFile); err != nil {
			return nil, err
		}
	}

	if err := os.RemoveAll(uploadDir); err != nil {
		s.Log.Error().Err(err).Str("uploadDir", uploadDir).Msg("could not remove chunk directory files")
	}

	return fullFile, nil
}

func (s *Service) appendChunk(uploadDir string, fs os.FileInfo, fullFile *os.File) error {
	path := uploadDir + "/" + fs.Name()

	src, err := os.Open(path)
	if err != nil {
		return err
	}
	defer src.Close()

	if _, err := io.CopyN(fullFile, src, fs.Size()); err != nil && err != io.EOF {
		return err
	}

	if err := os.Remove(uploadDir + "/" + fs.Name()); err != nil {
		s.Log.Error().Err(err).Str("path", path).Msg("could not remove chunk")
	}

	return nil
}
