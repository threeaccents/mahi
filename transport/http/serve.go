package http

import (
	"crypto/tls"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/fatih/color"
)

var DefaultClient = http.DefaultClient

// ListenAndServe just copies the http package ListenAndServe function
// later on I should refactor this to actually create my own server and handlers for now yolo
func ListenAndServe(addr string, handler http.Handler) error {
	return http.ListenAndServe(addr, handler)
}

// ListenAndServeTLS just copies the http package ListenAndServe function
// later on I should refactor this to actually create my own server and handlers for now yolo
func ListenAndServeTLS(addr, certFile, keyFile string, handler http.Handler) error {
	return http.ListenAndServeTLS(addr, certFile, keyFile, handler)
}

// Serve is
func Serve(handler http.Handler, port int, https bool, sslCertPath, sslKeyPath string) error {
	// Set the httpAddress
	httpAddress := ":" + strconv.Itoa(port)

	if !https {
		srv := &http.Server{
			ReadTimeout:  5 * time.Minute,
			WriteTimeout: 45 * time.Second,
			IdleTimeout:  120 * time.Second,
			Handler:      handler,
			Addr:         httpAddress,
		}
		color.Green("listening on port " + httpAddress)
		return srv.ListenAndServe()
	}

	srv := &http.Server{
		ReadTimeout:  5 * time.Minute,
		WriteTimeout: 45 * time.Second,
		IdleTimeout:  120 * time.Second,
		Handler:      http.HandlerFunc(redirectTLS),
	}
	go func() { log.Fatal(srv.ListenAndServe()) }()

	tlsConfig := &tls.Config{
		PreferServerCipherSuites: true,
		CurvePreferences: []tls.CurveID{
			tls.CurveP256,
			tls.X25519,
		},
	}

	tlsSrv := &http.Server{
		ReadTimeout:  60 * time.Minute,
		WriteTimeout: 60 * time.Minute,
		IdleTimeout:  120 * time.Second,
		TLSConfig:    tlsConfig,
		Handler:      handler,
		Addr:         httpAddress,
	}
	color.Green("listening on port " + httpAddress)
	return tlsSrv.ListenAndServeTLS(sslCertPath, sslKeyPath)
}
