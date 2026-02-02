package config

import (
	"fmt"
	"os"
)

type Config struct {
	ServerAddress string
	DatabaseURL   string // For future database connection
	Environment   string
}

func Load() *Config {
	return &Config{
		// ServerAddress: getEnv("SERVER_ADDRESS"),
		ServerAddress: ":8080",
		DatabaseURL:   getEnv("DATABASE_URL"),
		Environment:   getEnv("ENVIRONMENT"),
	}
}

func getEnv(key string) string {
	if value := os.Getenv(key); value != "" {
		return value
	}

	fmt.Errorf("environment variable %s is not set", key)

	return ""
}
