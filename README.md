<h1 align="center">
    Stream Live System
</h1>

## :warning: About the project

#### This project is a simple live broadcast system, the whole project is based on microservices. Warning, this project is an example where it can be used as a basis for building a more complex live system.

## :telescope: System architecture
![export](https://user-images.githubusercontent.com/40550247/83696432-dc8a7c80-a5d2-11ea-81f1-85f67142654e.png)

## :rocket: Technologies

* [kubernetes](https://kubernetes.io/pt/docs/home/)
* [Docker](https://www.docker.com/)
* [Node](https://nodejs.org/en/)
* [NestJS](https://nestjs.com/)
* [ReactJS](https://reactjs.org/)
* [Socket.io](https://socket.io/)
* [RabbitMQ](https://www.cloudamqp.com/)
* [WebRTC](https://webrtc.org/)
* [gRPC](https://grpc.io/docs/)

## :toolbox: Prerequisites
* Docker Compose version (1.25.4)
* Docker version (19.03.9)
* Node version (12.18.0)
* Npm version (6.14.4)

## :loudspeaker: Communication between systems

* Websockets
* Pub / Sub
* WebRTC
* Queue RabbitMQ
* gRPC

## :zap: Features

- **generator of lives**
    * Views of lives created
    * Creation of lives
    * Peers for WebRTC
    * WebSockets
    * gRPC Server

- **Streaming**
    * Live broadcast
    * View
    * Chat display and interaction on `Chat`

- **Chat**
    * Real-time communication between participants
    * Stores messages
    * Sends messages to a queue
