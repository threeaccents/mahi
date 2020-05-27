package http

import (
	"time"

	"github.com/threeaccents/mahi"
)

type fileResponse struct {
	Data *fileData `json:"data"`
}

type filesResponse struct {
	Data           []*fileData     `json:"data"`
	PaginationData *PaginationData `json:"meta"`
}

type fileData struct {
	ID         string    `json:"id"`
	Filename   string    `json:"fileName"`
	FileBlobID string    `json:"fileBlobID"`
	Size       int64     `json:"size"`
	MIMEType   string    `json:"mimeType"`
	MIMEValue  string    `json:"mimeValue"`
	Extension  string    `json:"extension"`
	URL        string    `json:"url"`
	Width      int       `json:"width"`
	Height     int       `json:"height"`
	CreatedAt  time.Time `json:"createdAt"`
	UpdatedAt  time.Time `json:"updatedAt"`
}

func sanitizeFile(f *mahi.File) *fileData {
	return &fileData{
		ID:         f.ID,
		Filename:   f.Filename,
		FileBlobID: f.FileBlobID,
		Size:       f.Size,
		MIMEType:   f.MIMEType,
		MIMEValue:  f.MIMEValue,
		Extension:  f.Extension,
		URL:        f.URL,
		Width:      f.Width,
		Height:     f.Height,
		CreatedAt:  f.CreatedAt,
		UpdatedAt:  f.UpdatedAt,
	}
}

func sanitizeFiles(v []*mahi.File) []*fileData {
	ss := make([]*fileData, len(v))
	for x, u := range v {
		nu := sanitizeFile(u)
		ss[x] = nu
	}

	return ss
}
