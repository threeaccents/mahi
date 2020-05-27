package main

import (
	"bytes"
	"context"
	"flag"
	"fmt"
	"io"
	_ "net/http/pprof"
	"os"

	"github.com/threeaccents/mahi/core/file"

	"github.com/threeaccents/mahi/core/upload"

	"github.com/threeaccents/mahi/transport/http"

	"github.com/threeaccents/mahi/core/application"

	"github.com/rs/cors"
	"github.com/rs/zerolog"

	"github.com/threeaccents/mahi/adapter/aes"

	"github.com/gorilla/schema"

	"github.com/jackc/pgx/v4/pgxpool"
	"github.com/threeaccents/mahi"
	"github.com/threeaccents/mahi/adapter/postgre"

	"github.com/BurntSushi/toml"
)

var (
	tomlConfigPathPtr = flag.String("config", "./mahi.toml", "the file path for the toml configuration file")
)

func main() {
	flag.Parse()

	if err := run(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}

func run() error {
	conf, err := parseConfig(*tomlConfigPathPtr)
	if err != nil {
		return err
	}

	logger := zerolog.New(os.Stdout).With().Timestamp().Str("service", "mahi").Logger()
	logger.Info().Msg("Starting Mahi...")

	var fileStorage mahi.FileStorage
	var applicationStorage mahi.ApplicationStorage

	if conf.DbEngine == DBEnginePostgreSQL {
		pgConf := conf.PostgreSQL
		pgxConf, err := pgxpool.ParseConfig(fmt.Sprintf("postgresql://%s:%s@%s:%d/%s", pgConf.User, pgConf.Password, pgConf.Host, pgConf.Port, pgConf.Database))
		if err != nil {
			return fmt.Errorf("failed to parse db url %w", err)
		}

		db, err := pgxpool.ConnectConfig(context.Background(), pgxConf)
		if err != nil {
			return err
		}
		defer db.Close()

		fileStorage = &postgre.FileStorage{
			DB: db,
		}

		applicationStorage = &postgre.ApplicationStorage{
			DB: db,
		}
	}

	// schema decoder
	schemaDecoder := schema.NewDecoder()

	//////////////////////////////
	// SERVICES //
	/////////////////////////////
	encryptionService := &aes.EncryptionService{
		Key: []byte(conf.Security.AESKey),
	}

	applicationService := &application.Service{
		EncryptionService:  encryptionService,
		ApplicationStorage: applicationStorage,
	}

	fileService := &file.Service{
		FileStorage: fileStorage,
	}

	uploadService := &upload.Service{
		ApplicationService: applicationService,
		FileService:        fileService,

		MaxChunkSize:      conf.Upload.MaxChunkSize,
		MaxUploadFileSize: conf.Upload.MaxUploadFileSize,
		ChunkUploadDir:    conf.Upload.ChunkUploadDir,
		FullFileDir:       conf.Upload.FullFileDir,
	}

	//////////////////////////////
	// HTTP //
	/////////////////////////////

	h := http.NewServer(&http.ServerConfig{
		ApplicationService: applicationService,
		UploadService:      uploadService,
		QueryDecoder:       schemaDecoder,
		Log:                logger,
	})

	opts := cors.Options{
		AllowedMethods: []string{"PUT", "POST", "GET", "DELETE", "PATCH"},
		AllowedHeaders: []string{"Origin", "Accept", "Content-Type", "Authorization", "Referer"},
		AllowedOrigins: []string{"*"},
	}
	corsOpts := cors.New(opts)
	corsHandler := corsOpts.Handler(h)
	requestIDMiddleware := http.RequestIDMiddleware(corsHandler)

	return http.Serve(requestIDMiddleware, conf.HTTP.Port, conf.HTTP.HTTPS)
}

func parseConfig(path string) (*Config, error) {
	configFile, err := os.Open(path)
	if err != nil {
		return nil, err
	}

	buf := new(bytes.Buffer)

	if _, err := io.Copy(buf, configFile); err != nil {
		return nil, err
	}

	var conf Config
	if _, err := toml.Decode(buf.String(), &conf); err != nil {
		return nil, err
	}

	return &conf, nil
}
