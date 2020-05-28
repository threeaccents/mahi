package http

type listUsageQuery struct {
	StartDate string `schema:"start_date"`
	EndDate   string `schema:"end_date"`
}
