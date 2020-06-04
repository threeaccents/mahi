package main

import (
	"bytes"
	"context"
	"flag"
	"fmt"
	"io"
	_ "net/http/pprof"
	"os"

	"github.com/threeaccents/mahi/adapter/bolt"

	"github.com/threeaccents/mahi/core/usage"

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

	if err := os.MkdirAll(conf.Upload.ChunkUploadDir, 02750); err != nil {
		return err
	}

	if err := os.MkdirAll(conf.Upload.FullFileDir, 02750); err != nil {
		return err
	}

	var fileStorage mahi.FileStorage
	var applicationStorage mahi.ApplicationStorage
	var usageStorage mahi.UsageStorage
	var transformStorage mahi.TransformStorage

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

		usageStorage = &postgre.UsageStorage{
			DB: db,
		}

		transformStorage = &postgre.TransformStorage{
			DB: db,
		}
	} else {
		// bolt db
		db, err := bolt.Open(conf.Bolt.Dir)
		if err != nil {
			return err
		}
		defer db.Close()

		fileStorage = &bolt.FileStorage{
			DB: db,
		}

		applicationStorage = &bolt.ApplicationStorage{
			DB: db,
		}

		usageStorage = &bolt.UsageStorage{
			DB: db,
		}

		transformStorage = &bolt.TransformStorage{
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

	usageService := &usage.Service{
		UsageStorage: usageStorage,
	}

	transformService := &file.TransformService{
		UsageService:         usageService,
		TransformStorage:     transformStorage,
		Log:                  logger,
		MaxTransformFileSize: conf.Upload.MaxTransformFileSize,
	}

	fileServeService := &file.ServeService{
		FileStorage:  fileStorage,
		UsageService: usageService,

		ApplicationService: applicationService,
		TransformService:   transformService,

		FullFileDir: conf.Upload.FullFileDir,

		Log: logger,
	}

	uploadService := &upload.Service{
		ApplicationService: applicationService,
		FileService:        fileService,
		UsageService:       usageService,

		MaxChunkSize:      conf.Upload.MaxChunkSize,
		MaxUploadFileSize: conf.Upload.MaxUploadFileSize,
		ChunkUploadDir:    conf.Upload.ChunkUploadDir,
		FullFileDir:       conf.Upload.FullFileDir,

		Log: logger,
	}

	//////////////////////////////
	// HTTP //
	/////////////////////////////

	h := http.NewServer(&http.ServerConfig{
		ApplicationService: applicationService,
		UploadService:      uploadService,
		FileServeService:   fileServeService,
		UsageService:       usageService,

		QueryDecoder: schemaDecoder,

		AuthToken: conf.Security.AuthToken,

		Log: logger,
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
