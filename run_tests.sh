#!/bin/bash

CURRENT_DIR=$(pwd)

# Run tests with docker-compose
docker-compose -f "$CURRENT_DIR/docker-compose.tests.yml" up --abort-on-container-exit

# Remove all containers
docker-compose -f "$CURRENT_DIR/docker-compose.tests.yml" down --volumes --remove-orphans --rmi local