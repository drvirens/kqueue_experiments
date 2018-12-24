#! /usr/bin/env bash

# must run this from folder b (for build)

cd .. && rm -rf b && mkdir b && cd b && cmake .. && cmake --build . && cd .. && cd b