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
		s.Authenticate(
			s.handleCreateApplication())).Methods("POST")

	const getApplicationPath = "/applications/{id}"
	s.Handle(getApplicationPath,
		s.Authenticate(
			s.handleGetApplication())).Methods("GET")

	const listApplicationsPath = "/applications"
	s.Handle(listApplicationsPath,
		s.Authenticate(
			s.handleListApplications())).Methods("GET")

	const updateApplication = "/applications/{id}"
	s.Handle(updateApplication,
		s.Authenticate(
			s.handleUpdateApplication())).Methods("PUT")

	const deleteApplicationPath = "/applications/{id}"
	s.Handle(deleteApplicationPath,
		s.Authenticate(
			s.handleDeleteApplication())).Methods("DELETE")

	//////////////////////////////
	// UPLOAD //
	/////////////////////////////
	const uploadFilePath = "/upload"
	s.Handle(uploadFilePath,
		s.Authenticate(
			s.handleUpload())).Methods("POST")

	const uploadChunkFilePath = "/chunk-upload"
	s.Handle(uploadChunkFilePath,
		s.Authenticate(
			s.handleChunkUpload())).Methods("POST")

	const completedChunksPath = "/chunks-completed"
	s.Handle(completedChunksPath,
		s.Authenticate(
			s.handleCompleteChunkUpload())).Methods("POST")

	//////////////////////////////
	// USAGES //
	/////////////////////////////
	const listUsages = "/usages"
	s.Handle(listUsages,
		s.Authenticate(
			s.handleListUsages())).Methods("GET")

	const listApplicationUsages = "/applications/{application_id}/usages"
	s.Handle(listApplicationUsages,
		s.Authenticate(
			s.handleListApplicationUsages())).Methods("GET")

	//////////////////////////////
	// SERVE FILE //
	/////////////////////////////
	s.PathPrefix("/{app_name}/{date}/{file_name}").Handler(
		s.handleServeFile()).Methods("GET")

	//////////////////////////////
	// PPROF //
	/////////////////////////////
	s.PathPrefix("/debug/pprof/").Handler(http.DefaultServeMux)
}
