package http

import (
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"

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
			DeliveryURL:      payload.DeliveryURL,
		}

		a, err := s.ApplicationService.Create(r.Context(), n)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &applicationResponse{
			Data: sanitizeApplication(a),
		}

		RespondCreated(w, resp)
	})
}

func (s *Server) handleGetApplication() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		a, err := s.ApplicationService.Application(r.Context(), id)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &applicationResponse{
			Data: sanitizeApplication(a),
		}

		RespondOK(w, resp)
	})
}

func (s *Server) handleListApplications() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var queryParams listApplicationQueryParam
		if err := s.QueryDecoder.Decode(&queryParams, r.URL.Query()); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		a, err := s.ApplicationService.Applications(r.Context(), queryParams.SinceID, queryParams.Limit)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &applicationsResponse{
			PaginationData: PaginationData{
				Count:   len(a),
				SinceID: generateApplicationSinceID(a, queryParams.Limit),
				Links: LinksData{
					Self: r.URL.String(),
					Next: generateNextApplicationURL(a, queryParams.Limit, r.URL.Query()),
				},
			},
			Data: sanitizeApplications(a),
		}

		RespondOK(w, resp)
	})
}

func (s *Server) handleUpdateApplication() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		payload := new(updateApplicationRequest)
		if err := json.NewDecoder(r.Body).Decode(payload); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		payload.ID = id

		if err := payload.validate(); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		n := &mahi.UpdateApplication{
			ID:          payload.ID,
			Name:        payload.Name,
			Description: payload.Description,
		}

		a, err := s.ApplicationService.Update(r.Context(), n)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &applicationResponse{
			Data: sanitizeApplication(a),
		}

		RespondOK(w, resp)
	})
}

func (s *Server) handleDeleteApplication() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		id := mux.Vars(r)["id"]

		if err := s.ApplicationService.Delete(r.Context(), id); err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		RespondMessage(w, "application was deleted")
	})
}

func generateApplicationSinceID(applications []*mahi.Application, queryLimit int) string {
	filesLen := len(applications)

	if filesLen == 0 {
		return ""
	}

	if filesLen != mahi.DefaultFilePaginationLimit || filesLen != queryLimit {
		return applications[len(applications)-1].ID
	}

	return ""
}

func generateNextApplicationURL(applications []*mahi.Application, queryLimit int, q url.Values) string {
	appsLen := len(applications)

	if appsLen == 0 {
		return ""
	}

	if appsLen == mahi.DefaultFilePaginationLimit || appsLen == queryLimit {
		sinceID := applications[len(applications)-1].ID

		q.Set("since_id", sinceID)

		return fmt.Sprintf("/applications?%s", q.Encode())
	}

	return ""
}
