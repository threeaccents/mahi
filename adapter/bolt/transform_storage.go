package bolt

import (
	"context"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type TransformStorage struct {
	DB *storm.DB
}

func (s *TransformStorage) Store(ctx context.Context, n *mahi.NewTransformation) (*mahi.Transformation, error) {
	return nil, nil
}
