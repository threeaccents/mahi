package bolt

import (
	"context"
	"errors"
	"time"

	"github.com/asdine/storm/v3/q"

	"github.com/google/uuid"

	"github.com/asdine/storm/v3"
	"github.com/threeaccents/mahi"
)

type TransformStorage struct {
	DB *storm.DB
}

type transformation struct {
	Pk            int    `storm:"id,increment"`
	ID            string `storm:"index"`
	ApplicationID string
	FileID        string
	Actions       mahi.TransformationOption
	CreatedAt     time.Time
	UpdatedAt     time.Time
}

func (t transformation) validate(db *storm.DB) error {
	if t.ApplicationID == "" {
		return errors.New("applicationID is required")
	}

	if t.FileID == "" {
		return errors.New("fileID is required")
	}

	if t.Actions == (mahi.TransformationOption{}) {
		return errors.New("actions is required")
	}

	var tran transformation
	if err := db.Select(q.Eq("FileID", t.FileID), q.Eq("Actions", t.Actions)).First(&tran); err != nil {
		if err == storm.ErrNotFound {
			return nil
		}
		return err
	}

	if tran.ID != "" {
		return mahi.ErrTransformationNotUnique
	}

	return nil
}

func (s *TransformStorage) Store(ctx context.Context, n *mahi.NewTransformation) (*mahi.Transformation, error) {
	t := transformation{
		ID:            uuid.New().String(),
		ApplicationID: n.ApplicationID,
		FileID:        n.FileID,
		Actions:       n.Actions,
		CreatedAt:     time.Now(),
		UpdatedAt:     time.Now(),
	}

	if err := t.validate(s.DB); err != nil {
		return nil, err
	}

	if err := s.DB.Save(&t); err != nil {
		if err == storm.ErrAlreadyExists {
			return nil, mahi.ErrApplicationNameTaken
		}
		return nil, err
	}

	mahiTran := sanitizeTransformation(t)

	return &mahiTran, nil
}

func sanitizeTransformation(t transformation) mahi.Transformation {
	return mahi.Transformation{
		ID:            t.ID,
		ApplicationID: t.ApplicationID,
		FileID:        t.FileID,
		Actions:       t.Actions,
		CreatedAt:     t.CreatedAt,
		UpdatedAt:     t.UpdatedAt,
	}
}
