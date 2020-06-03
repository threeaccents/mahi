package bolt

import (
	"github.com/asdine/storm/v3"
)

func Open(dir string) (*storm.DB, error) {
	return storm.Open(dir)
}
