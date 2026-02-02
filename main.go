package main

import (
	"log"
	"net/http"
	"os"

	"budgeting/internal/config"
	"budgeting/internal/handlers"
)

func main() {
	cfg := config.Load()

	mux := http.NewServeMux()

	mux.HandleFunc("/health", handlers.HealthCheck)

	log.Printf("Starting server on %s", cfg.ServerAddress)
	if err := http.ListenAndServe(cfg.ServerAddress, mux); err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}
