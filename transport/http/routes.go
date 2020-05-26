package http

import "net/http"

func (s *Server) routes() {
	//////////////////////////////
	// HEALTH //
	/////////////////////////////
	const healthCheckPath = "/health"
	s.Handle(healthCheckPath,
		s.handleHealth()).Methods("GET")

	//////////////////////////////
	// APPLICATIONS //
	/////////////////////////////
	const createApplicationPath = "/applications"
	s.Handle(createApplicationPath,
		s.handleCreateApplication()).Methods("POST")

	//////////////////////////////
	// PPROF //
	/////////////////////////////
	s.PathPrefix("/debug/pprof/").Handler(http.DefaultServeMux)
}
