package http

import "errors"

type completeChunkUploadRequest struct {
	UploadID      string `json:"uploadId"`
	Filename      string `json:"fileName"`
	ApplicationID string `json:"applicationId"`
}

func (r *completeChunkUploadRequest) validate() error {
	if r.UploadID == "" {
		return errors.New("uploadId is required")
	}

	if r.Filename == "" {
		return errors.New("fileName is required")
	}

	if r.ApplicationID == "" {
		return errors.New("applicationId is required")
	}

	return nil
}
