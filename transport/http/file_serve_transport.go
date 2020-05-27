package http

import "net/http"

func (s *Server) handleServeFile() http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		blob, err := s.FileServeService.Serve(r.Context(), r.URL)
		if err != nil {
			RespondError(w, err, http.StatusInternalServerError, GetReqID(r))
			return
		}
		defer blob.Close()

		RespondServeFile(w, blob)
	})
}
