package http

import (
	"fmt"
	"net/http"
	"net/url"

	"github.com/gorilla/mux"

	"github.com/threeaccents/mahi"
)

func (s *Server) handleListApplicationFiles() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		applicationID := mux.Vars(r)["application_id"]

		var queryParams listFileQueryParam
		if err := s.QueryDecoder.Decode(&queryParams, r.URL.Query()); err != nil {
			RespondError(w, err, http.StatusBadRequest, GetReqID(r))
			return
		}

		files, err := s.FileService.ApplicationFiles(r.Context(), applicationID, queryParams.SinceID, queryParams.Limit)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}

		resp := &filesResponse{
			PaginationData: PaginationData{
				Count:   len(files),
				SinceID: generateFileSinceID(files, queryParams.Limit),
				Links: LinksData{
					Self: r.URL.String(),
					Next: generateNextFileURL(files, queryParams.Limit, r.URL.Query()),
				},
			},
			Data: sanitizeFiles(files),
		}

		RespondOK(w, resp)
	})
}

func generateFileSinceID(files []*mahi.File, queryLimit int) string {
	filesLen := len(files)

	if filesLen == 0 {
		return ""
	}

	if filesLen != mahi.DefaultFilePaginationLimit || filesLen != queryLimit {
		return files[len(files)-1].ID
	}

	return ""
}

func generateNextFileURL(files []*mahi.File, queryLimit int, q url.Values) string {
	appsLen := len(files)

	if appsLen == 0 {
		return ""
	}

	if appsLen == mahi.DefaultFilePaginationLimit || appsLen == queryLimit {
		sinceID := files[len(files)-1].ID
		appID := files[len(files)-1].ApplicationID

		q.Set("since_id", sinceID)

		return fmt.Sprintf("/applications/%s/files?%s", appID, q.Encode())
	}

	return ""
}
