# mapilary-orderform
form for ordering Mapilary delivery services

![screenshot](/screenshot.png "screenshot")

## How to install

Before proceeding, make sure you have npm installed.

Install bower dependencies:

```
npm install
```

## How to build

Result will be build in dist/ folder.

```
npm run build
```

## Run in docker container

### Build docker data volume with static app content

```
docker build -t mapilary/orderform-volume .
docker run --name mapilary_orderform_volume -P -d mapilary/orderform-volume
```

### Create docker container

```
docker create \
  --publish 3006:80 \
  --name mapilary_orderform \
  --volumes-from mapilary_orderform_volume \
  nginx:alpine
```

### Start application

```
docker start mapilary_orderform
```

Application will be accesible from: http://localhost:3006

### Stop application

```
docker stop mapilary_orderform
```

## How to run development server

The server will be started on port 8080 a you can access app on http://localhost:8080/src/

```
npm run start
```
