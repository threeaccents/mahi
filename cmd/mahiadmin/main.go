package main

import (
	"log"
	"net/http"
)

func main() {
	staticFs := http.FileServer(http.Dir("./static/www/assets"))
	http.Handle("/static/", http.StripPrefix("/static", staticFs))

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./static/www/index.html")
	})

	log.Println("Listening on :3000...")
	err := http.ListenAndServe(":3000", nil)
	if err != nil {
		log.Fatal(err)
	}
}
