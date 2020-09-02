package http

type listFileQueryParam struct {
	SinceID     string `schema:"since_id"`
	Application string `schema:"application"`
	Limit       int    `schema:"limit"`
}
