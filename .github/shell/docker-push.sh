#!/bin/bash

docker build -t ${DOCKER_REGISTRY}/${APP_NAME}:latest .

if ! docker info 2>/dev/null | grep -q "Username"; then
    if [ -z "${DOCKER_PASSWORD}" ] || [ -z "${GIT_HUB_REGISTRY}" ] || [ -z "${GITHUB_USERNAME}" ]; then
        echo "Error: Required environment variables are not set"
        exit 1
    fi
    
    echo "${DOCKER_PASSWORD}" | docker login "${GIT_HUB_REGISTRY}" -u "${GITHUB_USERNAME}" --password-stdin || {
        echo "Error: Docker login failed"
        exit 1
    }
fi

docker push ${DOCKER_REGISTRY}/${APP_NAME}:latest
