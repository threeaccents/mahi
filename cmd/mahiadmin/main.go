package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

func main() {
	assetfs := http.FileServer(http.Dir("./static/www/assets"))
	http.Handle("/static/", http.StripPrefix("/static/", assetfs))

	fs := http.FileServer(http.Dir("./static/www"))
	http.Handle("/", fs)

	log.Println("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}

type Route struct {
	Name        string
	Method      string
	Pattern     string
	HandlerFunc http.HandlerFunc
}

type Routes []Route

var routes = Routes{
	Route{
		"Index",
		"GET",
		"/",
		Index,
	},
}

func NewRouter() *mux.Router {

	router := mux.NewRouter().StrictSlash(true)
	for _, route := range routes {
		var handler http.Handler

		handler = route.HandlerFunc

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)

	}

	return router
}

func Index(w http.ResponseWriter, r *http.Request) {
	fmt.Println("hit", r.URL.String())
	http.FileServer(http.Dir("./static/www")).ServeHTTP(w, r)
}
