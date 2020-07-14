<h1 align="center">
  Microservice live chat
</h1>

## :memo: Info
  - **Backend**
    - NestJS
      * SocketIO
      * PeerServer
      * PostgreSQL
      * Redis
      * gRPC

## :information_source: Getting Started

1. At the terminal, run:

```bash
$ docker-compose up -d
```

## :warning: Warning

If you have a permission error when running the docker, run these commands below to apply the permissions to the file ``.docker/entrypoint.sh``, for windows use [Git Bash](https://gitforwindows.org/).

```bash
/* Only for Unix environment */
$ chmod +x .docker/entrypoint.sh

/* Windows only (works on Git Bash terminal only) */
$ dos2unix .docker/entrypoint.sh 
```

## :hammer_and_wrench: Build

```bash
$ docker-compose -f docker-compose.prod.yaml build
```
---