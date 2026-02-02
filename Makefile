# Binary name
BINARY_NAME=budgeting
BINARY_PATH=./bin/$(BINARY_NAME)

# Go parameters
GOCMD=go
GOBUILD=$(GOCMD) build
GOCLEAN=$(GOCMD) clean
GOTEST=$(GOCMD) test
GOGET=$(GOCMD) get
GOFMT=$(GOCMD) fmt
GOVET=$(GOCMD) vet
GOMOD=$(GOCMD) mod

.DEFAULT_GOAL := run

build:
	@mkdir -p bin
	$(GOBUILD) -o $(BINARY_PATH) -v

run:
	$(GOCMD) run main.go

test: ## Run tests
	@echo "Running tests..."
	$(GOTEST) -v ./...

clean: ## Clean build files
	@echo "Cleaning..."
	$(GOCLEAN)
	@rm -rf bin
	@rm -f coverage.out coverage.html

fmt: ## Format code
	@echo "Formatting code..."
	$(GOFMT) ./...

vet: ## Run go vet
	@echo "Running go vet..."
	$(GOVET) ./...

lint: fmt vet ## Run formatting and vetting

deps: ## Download dependencies
	$(GOMOD) download
	$(GOMOD) tidy

docker-build: ## Build docker image
	@echo "Building docker image..."
	docker build -t $(BINARY_NAME):latest .

docker-run: ## Run docker container
	@echo "Running docker container..."
	docker run -p 8080:8080 $(BINARY_NAME):latest

