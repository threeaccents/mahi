package main

import (
	"flag"
)

const (
	maxChunkSize = int64(2e+7) // 20MB
)

var (
	chunkUploadDirPtr = flag.String("chunk_dir", "./data/chunks", "the directory where chunks will be saved to")
	fullFileDirPtr    = flag.String("full_file_dir", "./data/fullfiles", "the directory where full files will be temporarily saved to")
	hostPtr           = flag.String("host", "localhost", "the host for the mahi service")
	maxChunkSizePtr   = flag.Int64("max_chunk_size", maxChunkSize, "max size for file chunks")
	dbEnginePtr       = flag.String("db_engine", "badger", "the database engine to use. Options are badger and postgresql")
)

func main() {
	flag.Parse()

	// service
	//uploadService := upload.Service{
	//	ChunkUploadDir: *chunkUploadDirPtr,
	//	FullFileDir:    *fullFileDirPtr,
	//	Host:           *hostPtr,
	//	MaxChunkSize:   *maxChunkSizePtr,
	//}

}
