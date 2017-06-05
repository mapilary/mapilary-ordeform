# https://docs.docker.com/engine/userguide/eng-image/multistage-build/#use-multi-stage-builds

###########################
# Build stage
###########################

FROM node:6-alpine

# Install build deps
RUN apk update && \
    apk upgrade && \
    apk add --no-cache git

# use changes to package.json to force Docker not to use the cache
# when we change our application's nodejs dependencies:
ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

# From here we load our application's code in, therefore the previous docker
# "layer" thats been cached will be used if possible
WORKDIR /opt/app
ADD . /opt/app

RUN npm run build

###########################
# Second stage
###########################

FROM node:6-alpine

RUN mkdir -p /usr/share/nginx/html
COPY --from=0 /opt/app/dist /usr/share/nginx/html

VOLUME /usr/share/nginx/html
