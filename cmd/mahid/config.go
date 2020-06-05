package main

import (
	"errors"
	"fmt"
	"log"
	"runtime"
)

const (
	DBEnginePostgreSQL = "postgres"
	DBEngineBolt       = "bolt"

	DefaultMaxChunkSize      = 10000000 // 10MB
	DefaultTransformFileSize = 50000000 // 50MB
	DefaultMaxUploadFileSize = 50000000 // 50MB

	DefaultChunkUploadDir = "./data/chunks"
	DefaultFullFileDir    = "./data/files"

	DefaultHTTPPort = 4200

	DefaultPostgreDatabase = "mahi"
	DefaultPostgreUser     = "mahi"
	DefaultPostgrePassword = ""
	DefaultPostgreHost     = "localhost"
	DefaultPostgrePort     = 5432

	DefaultBoltDir = "./data/mahi/mahi.db"
)

var DefaultPostgreMaxConns = runtime.NumCPU() * 10

type Config struct {
	DbEngine   string     `toml:"db_engine"`
	Upload     Upload     `toml:"upload"`
	PostgreSQL PostgreSQL `toml:"postgresql"`
	Bolt       Bolt       `toml:"bolt"`
	Security   Security   `toml:"security"`
	HTTP       HTTP       `toml:"http"`
}

func (c *Config) init() error {
	if err := c.validate(); err != nil {
		return err
	}

	if c.Upload.ChunkUploadDir == "" {
		c.Upload.ChunkUploadDir = DefaultFullFileDir
	}
	if c.Upload.FullFileDir == "" {
		c.Upload.FullFileDir = DefaultChunkUploadDir
	}
	if c.Upload.MaxChunkSize == 0 {
		c.Upload.MaxChunkSize = DefaultMaxChunkSize
	}
	if c.Upload.MaxTransformFileSize == 0 {
		c.Upload.MaxTransformFileSize = DefaultTransformFileSize
	}
	if c.Upload.MaxUploadFileSize == 0 {
		c.Upload.MaxUploadFileSize = DefaultMaxUploadFileSize
	}

	if c.HTTP.Port == 0 {
		c.HTTP.Port = DefaultHTTPPort
	}

	if c.DbEngine == DBEnginePostgreSQL {
		if c.PostgreSQL.Database == "" {
			c.PostgreSQL.Database = DefaultPostgreDatabase
		}
		if c.PostgreSQL.User == "" {
			c.PostgreSQL.User = DefaultPostgreUser
		}
		if c.PostgreSQL.Password == "" {
			c.PostgreSQL.Password = DefaultPostgrePassword
		}
		if c.PostgreSQL.Host == "" {
			c.PostgreSQL.Host = DefaultPostgreHost
		}
		if c.PostgreSQL.Port == 0 {
			c.PostgreSQL.Port = DefaultPostgrePort
		}
		if c.PostgreSQL.MaxConns == 0 {
			c.PostgreSQL.MaxConns = DefaultPostgreMaxConns
		}
	}

	if c.DbEngine == DBEngineBolt {
		if c.Bolt.Dir == "" {
			c.Bolt.Dir = DefaultBoltDir
		}
	}

	return nil
}

func (c *Config) validate() error {
	if c.DbEngine == "" {
		return errors.New("db_engine is required")
	}
	if c.DbEngine != DBEnginePostgreSQL && c.DbEngine != DBEngineBolt {
		return fmt.Errorf("db_engine must be of type %s or %s", DBEnginePostgreSQL, DBEngineBolt)
	}
	if c.Security.AESKey == "" {
		return errors.New("[security].aes_key is required")
	}
	if len(c.Security.AESKey) != 32 {
		return errors.New("[security].aes_key must be a 32 byte key")
	}
	if len(c.Security.AESKey) < 20 {
		log.Println("[WARN] [security].auth_token is too short. Consider using a longer more secure auth token.")
	}

	if c.HTTP.HTTPS {
		if c.HTTP.SSLCertPath == "" {
			return errors.New("[http].ssl_cert_path is required")
		}
		if c.HTTP.SSLKeyPath == "" {
			return errors.New("[http].ssl_key_path is required")
		}
	}

	return nil
}

type HTTP struct {
	HTTPS       bool   `toml:"https"`
	Port        int    `toml:"port"`
	SSLCertPath string `toml:"ssl_cert_path"`
	SSLKeyPath  string `toml:"ssl_key_path"`
}

type Security struct {
	AESKey    string `toml:"aes_key"`
	AuthToken string `toml:"auth_token"`
	HTTPS     bool   `toml:"https"`
}

type Upload struct {
	ChunkUploadDir       string `toml:"chunk_upload_dir"`
	FullFileDir          string `toml:"full_file_dir"`
	MaxChunkSize         int64  `toml:"max_chunk_size"`
	MaxUploadFileSize    int64  `toml:"max_file_size_upload"`
	MaxTransformFileSize int64  `toml:"max_transform_file_size"`
}

type PostgreSQL struct {
	Database string `toml:"database"`
	Host     string `toml:"host"`
	Port     int    `toml:"port"`
	User     string `toml:"user"`
	Password string `toml:"password"`
	MaxConns int    `toml:"max_conns"`
}

type Bolt struct {
	Dir string `toml:"dir"`
}
