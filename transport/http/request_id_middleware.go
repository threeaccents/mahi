package http

import (
	"context"
	"net/http"
	"os"

	"github.com/google/uuid"

	"github.com/rs/zerolog"
)

// reqIDContextKey is
type reqIDContextKey string

// GetReqID is
func GetReqID(r *http.Request) string {
	return r.Context().Value(reqIDContextKey("req_id")).(string)
}

// RequestIDMiddleware creates a id for each request coming in. It then passes it down via context
func RequestIDMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		k := reqIDContextKey("req_id")
		id := uuid.New().String()
		ctx := context.WithValue(r.Context(), k, id)
		v := zerolog.New(os.Stdout)
		v.Info().Str("requestId", id).Str("url", r.URL.String()).Str("remoteAddr", r.RemoteAddr).Msg("processing request")
		next.ServeHTTP(w, r.WithContext(ctx))
	})
}
