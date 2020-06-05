package http

import (
	"encoding/json"
	"net/http"
)

func (s *Server) handleUpload() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		multiReader, err := r.MultipartReader()
		if err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}
		f, err := s.UploadService.Upload(r.Context(), multiReader)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &fileResponse{
			Data: sanitizeFile(f),
		}

		RespondCreated(w, resp)
	})
}

func (s *Server) handleChunkUpload() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		multiReader, err := r.MultipartReader()
		if err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		if err := s.UploadService.ChunkUpload(r.Context(), multiReader); err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		RespondMessage(w, "chunk was uploaded")
	})
}

func (s *Server) handleCompleteChunkUpload() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		payload := new(completeChunkUploadRequest)
		if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		if err := payload.validate(); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		f, err := s.UploadService.CompleteChunkUpload(r.Context(), payload.ApplicationID, payload.UploadID, payload.Filename)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &fileResponse{
			Data: sanitizeFile(f),
		}

		RespondCreated(w, resp)
	})
}
