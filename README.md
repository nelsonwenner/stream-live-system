<h1 align="center">
    Stream Live System
</h1>

<p align="center">

  <img alt="Workflow" src="https://github.com/nelsonwenner/stream-live-system/workflows/CI/badge.svg">
  
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/nelsonwenner/stream-live-system?color=%2304D361">

  <a href="https://github.com/nelsondiaas">
    <img alt="Made by @nelsonwenner" src="https://img.shields.io/badge/made%20by-%40nelsonwenner-%2304D361">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/nelsondiaas/react-hotel-web/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/nelsonwenner/stream-live-system?style=social">
  </a>
  
</p>

<p align="center">
  <a href="#technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#license">License</a>
</p>

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
* [peerJS](https://peerjs.com/)

## :toolbox: Prerequisites
* Docker Compose version (1.25.4)
* Docker version (19.03.9)
* Node version (12.18.0)
* Npm version (6.14.4)

## :loudspeaker: Communication between systems

* Websockets
* Queue RabbitMQ
* Publish/Subscribe
* WebRTC
* gRPC

## :zap: Features

- **Generator of lives**
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

## :information_source: Getting Started

The application was built using the concepts of microservices and architected with Docker. To run, it will be necessary to run or command the docker-compose up.
Access each microservice respectively and read **README.md** to see more details on how to run the microservice.

1. [Queue rabbitMQ](https://github.com/nelsonwenner/stream-live-system/tree/master/rabbitmq)
2. [Microservice live manager](https://github.com/nelsonwenner/stream-live-system/tree/master/micro-live-manager)
3. [Microservice live chat](https://github.com/nelsonwenner/stream-live-system/tree/master/micro-live-chat)
4. [Microservice live streaming](https://github.com/nelsonwenner/stream-live-system/tree/master/micro-live-streaming)

## :memo: License
This project is under the MIT license. See the [LICENSE](LICENSE.md) for more information.

---
