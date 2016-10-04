#!/usr/bin/env bash

webpack && \
mkdir -p dist/vendor && \
cp node_modules/jquery/dist/jquery.min.js \
    node_modules/react-dom/dist/react-dom.min.js \
    node_modules/react/dist/react-with-addons.min.js dist/vendor/ && \
cp src/index.dist.html dist/index.html && \
cp -r src/data src/config.js dist/ && \
mkdir -p dist/css && \
cat src/css/* node_modules/react-select/dist/react-select.css > dist/css/bundle.css
