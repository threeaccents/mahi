package http

import (
	"errors"
	"net/http"
	"strings"

	"github.com/threeaccents/mahi"
)

func (s *Server) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if s.AuthToken == "" {
			next.ServeHTTP(w, r)
			return
		}

		requestToken, err := extractAuthToken(r)
		if err != nil {
			RespondError(w, err, http.StatusUnauthorized, "")
			return
		}

		if requestToken != s.AuthToken {
			RespondError(w, errors.New("invalid auth token"), http.StatusUnauthorized, "")
			return
		}

		next.ServeHTTP(w, r)
	})
}

func extractAuthToken(r *http.Request) (string, error) {
	authHeader := r.Header.Get("Authorization")
	if authHeader == "" {
		return "", mahi.ErrAuthorizationHeaderMissing
	}

	authHeaderParts := strings.Split(authHeader, " ")
	if len(authHeaderParts) != 2 || strings.ToLower(authHeaderParts[0]) != "bearer" {
		return "", errors.New("Authorization header format must be Bearer {token}")
	}

	authToken := authHeaderParts[1]

	return authToken, nil
}
