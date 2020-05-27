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

	const getApplicationPath = "/applications/{id}"
	s.Handle(getApplicationPath,
		s.handleGetApplication()).Methods("GET")

	const listApplicationsPath = "/applications"
	s.Handle(listApplicationsPath,
		s.handleListApplications()).Methods("GET")

	const updateApplication = "/applications/{id}"
	s.Handle(updateApplication,
		s.handleUpdateApplication()).Methods("PUT")

	const deleteApplicationPath = "/applications/{id}"
	s.Handle(deleteApplicationPath,
		s.handleDeleteApplication()).Methods("DELETE")

	//////////////////////////////
	// UPLOAD //
	/////////////////////////////
	const uploadFilePath = "/upload"
	s.Handle(uploadFilePath,
		s.handleUpload()).Methods("POST")

	const uploadChunkFilePath = "/chunk-upload"
	s.Handle(uploadChunkFilePath,
		s.handleChunkUpload()).Methods("POST")

	const completedChunksPath = "/chunks-completed"
	s.Handle(completedChunksPath,
		s.handleCompleteChunkUpload()).Methods("POST")

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
