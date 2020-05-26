package http

import (
	"encoding/json"
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/threeaccents/mahi"
)

func (s *Server) handleCreateApplication() http.Handler {
	type request struct {
		Name             string `json:"name" valid:"required"`
		Description      string `json:"description"`
		StorageAccessKey string `json:"storageAccessKey" valid:"required"`
		StorageSecretKey string `json:"storageSecretKey" valid:"required"`
		StorageRegion    string `json:"storageRegion" valid:"required"`
		StorageEngine    string `json:"storageEngine" valid:"required"`
	}

	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		payload := new(request)
		if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		if _, err := govalidator.ValidateStruct(payload); err != nil {
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
