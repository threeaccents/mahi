package http

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	"github.com/rs/zerolog"

	"github.com/threeaccents/mahi"
)

type PaginationData struct {
	Links   LinksData `json:"links"`
	Count   int       `json:"count"`
	SinceID string    `json:"sinceId"`
}

type LinksData struct {
	Self string `json:"self"`
	Next string `json:"next"`
}

type RelationshipData struct {
	ID   string `json:"id"`
	HREF string `json:"href"`
}

type RelationshipsData struct {
	HREF string `json:"href"`
}

// Error is a generic HTTP response body for errors.
type Error struct {
	Error     string `json:"error,omitempty"`
	Type      string `json:"type"`
	RequestID string `json:"requestId"`
	HTTPCode  int    `json:"httpCode"`
}

type Message struct {
	Data *MessageData `json:"data"`
}

type MessageData struct {
	Message string `json:"message"`
}

// RespondError writes an API error message to the response and logger.
func RespondError(w http.ResponseWriter, err error, code int, reqID string) {
	if errors.Is(err, mahi.ErrFileToLargeToTransform) || errors.Is(err, mahi.ErrApplicationNameTaken) || errors.Is(err, mahi.ErrBucketNotFound) || errors.Is(err, mahi.ErrInvalidStorageKey) {
		code = http.StatusBadRequest
	}

	if errors.Is(err, mahi.ErrFileNotFound) || errors.Is(err, mahi.ErrApplicationNotFound) {
		code = http.StatusNotFound
	}

	if code == http.StatusInternalServerError {
		logger := zerolog.New(os.Stdout).With().Timestamp().Logger()
		logger.Error().Str("requestId", reqID).Int("httpCode", code).Err(err).Msg("internal server error")
	}

	// Hide error from client if it is internal.
	if code == http.StatusInternalServerError && os.Getenv("DEBUG") != "true" {
		err = mahi.ErrInternal
	}

	var errType string
	switch code {
	case http.StatusInternalServerError:
		errType = "internal error"
		break
	case http.StatusBadRequest:
		errType = "validation error"
		break
	case http.StatusNotFound:
		errType = "Not Found"
		break
	case http.StatusForbidden:
		errType = "authentication error"
		break
	case http.StatusUnauthorized:
		errType = "authorization error"
		break
	default:
		errType = "internal error"
	}

	// Write generic error response.
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	resp := &Error{Error: err.Error(), Type: errType, RequestID: reqID, HTTPCode: code}
	encodeJSON(w, resp)
}

// NotFound writes an API error message to the response.
func RespondNotFound(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusNotFound)
	w.Write([]byte(`{}` + "\n"))
}

func RespondMessage(w http.ResponseWriter, msg string) {
	resp := &Message{
		Data: &MessageData{Message: msg},
	}
	fmt.Println("respinding OKKKKKK")
	RespondOK(w, resp)
}

// OK encodes a JSON response and sets the status to HTTP Status to 200 OK
func RespondOK(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	encodeJSON(w, v)
}

// Accepted encodes a JSON response and sets the status to HTTP Status to 200 OK
func RespondAccepted(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(202)
	encodeJSON(w, v)
}

func RespondServeFile(w http.ResponseWriter, f *mahi.FileBlob) {
	w.Header().Set("Content-Type", f.MIMEValue)
	w.Header().Set("Content-Length", strconv.FormatInt(f.Size, 10))
	w.Header().Set("Cache-Control", "max-age=2592000")
	io.Copy(w, f.Data)
}

// RespondCreated encodes a JSON response and sets the status to HTTP Status to 201 CREATED
func RespondCreated(w http.ResponseWriter, v interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	encodeJSON(w, v)
}

// encodeJSON encodes v to w in JSON format. Error() is called if encoding fails.
func encodeJSON(w http.ResponseWriter, v interface{}) {
	if err := json.NewEncoder(w).Encode(v); err != nil {
		RespondError(w, errors.New("could not encode response"), http.StatusInternalServerError, "")
	}
	fmt.Println("SENTTTTTT JSON RESPONSE")
}
