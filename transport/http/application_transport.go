package http

import (
	"encoding/json"
	"net/http"

	"github.com/threeaccents/mahi"
)

func (s *Server) handleCreateApplication() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		payload := new(createApplicationRequest)
		if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		if err := payload.validate(); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		n := &mahi.NewApplication{
			Name:             payload.Name,
			Description:      payload.Description,
			StorageAccessKey: payload.StorageAccessKey,
			StorageSecretKey: payload.StorageSecretKey,
			StorageRegion:    payload.StorageRegion,
			StorageEngine:    payload.StorageEngine,
		}

		p, err := s.ApplicationService.Create(r.Context(), n)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &applicationResponse{
			Data: sanitizeApplication(p),
		}

		RespondCreated(w, resp)
	})
}
