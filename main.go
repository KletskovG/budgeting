package main

import (
	"log"
	"net/http"
	"os"

	"budgeting/internal/config"
	"budgeting/internal/handlers"
)

func main() {
	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load configuration: %v", err)
	}

	log.Printf("Environment: %s", cfg.Environment)

	mux := http.NewServeMux()

	mux.HandleFunc("/health", handlers.HealthCheck)

	log.Printf("Starting server on %s", cfg.ServerAddress)
	if err := http.ListenAndServe(cfg.ServerAddress, mux); err != nil {
		log.Fatal(err)
		os.Exit(1)
	}
}
