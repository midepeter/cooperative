#!/bin/bash

# set go private repo env
go env -w GOPRIVATE=github.com/midepeter

# git config tokens
git config --global url."https://${GIT_HUB_USERNAME}:${DOCKER_PASSWORD}@github.com/midepeter".insteadOf \
    "https://github.com/midepeter"