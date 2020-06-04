package http

import (
	"net/http"
	"time"

	"github.com/threeaccents/mahi"

	"github.com/gorilla/mux"
)

func (s *Server) handleListUsages() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		var queryParams listUsageQuery
		if err := s.QueryDecoder.Decode(&queryParams, r.URL.Query()); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		startDate, err := parseTime(queryParams.StartDate)
		if err != nil {
			RespondError(w, mahi.ErrInvalidDate, http.StatusBadRequest, GetReqID(r))
			return
		}
		endDate, err := parseTime(queryParams.EndDate)
		if err != nil {
			RespondError(w, mahi.ErrInvalidDate, http.StatusBadRequest, GetReqID(r))
			return
		}

		usages, err := s.UsageService.Usages(r.Context(), startDate, endDate)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := usagesResponse{
			Data: sanitizeTotalUsages(usages),
		}

		RespondOK(w, resp)
	})
}

func (s *Server) handleListApplicationUsages() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		applicationID := mux.Vars(r)["application_id"]

		var queryParams listUsageQuery
		if err := s.QueryDecoder.Decode(&queryParams, r.URL.Query()); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		startDate, err := parseTime(queryParams.StartDate)
		if err != nil {
			RespondError(w, mahi.ErrInvalidDate, http.StatusBadRequest, GetReqID(r))
			return
		}
		endDate, err := parseTime(queryParams.EndDate)
		if err != nil {
			RespondError(w, mahi.ErrInvalidDate, http.StatusBadRequest, GetReqID(r))
			return
		}

		usages, err := s.UsageService.ApplicationUsages(r.Context(), applicationID, startDate, endDate)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := usagesResponse{
			Data: sanitizeUsages(usages),
		}

		RespondOK(w, resp)
	})
}

func parseTime(date string) (time.Time, error) {
	if date == "" {
		return time.Time{}, nil
	}

	t, err := time.Parse(mahi.DateLayout, date)
	if err != nil {
		return time.Time{}, err
	}

	return t, nil
}
