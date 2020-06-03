package main

const (
	DBEnginePostgreSQL = "postgresql"
)

type Config struct {
	DbEngine   string     `toml:"db_engine"`
	Upload     Upload     `toml:"upload"`
	PostgreSQL PostgreSQL `toml:"postgresql"`
	Bolt       Bolt       `toml:"bolt"`
	Security   Security   `toml:"security"`
	HTTP       HTTP       `toml:"http"`
}

type HTTP struct {
	HTTPS bool `toml:"https"`
	Port  int  `toml:"port"`
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
