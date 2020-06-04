<h1 align="center">
    Stream Live System
</h1>

## :warning: About the project

#### This project is a simple live broadcast system, the whole project is based on microservices. Warning, this project is an example where it can be used as a basis for building a more complex live system.

## :telescope: System architecture
![export](https://user-images.githubusercontent.com/40550247/83696432-dc8a7c80-a5d2-11ea-81f1-85f67142654e.png)

## :rocket: Technologies

* [NestJS](https://nestjs.com/)
* [ReactJS](https://reactjs.org/)
* [Socket.io](https://socket.io/)
* [RabbitMQ](https://www.cloudamqp.com/)
* [WebRTC](https://webrtc.org/)
* [gRPC](https://grpc.io/docs/)

## :loudspeaker: Communication between systems

* Websockets
* Pub / Sub
* WebRTC
* Queue RabbitMQ
* gRPC

## Features

- **Gerador de lives**
    * Visualisações das lives criadas
    * Criação das lives
    * Peers para WebRTC
    * WebSockets
    * gRPC Server

- **Streaming**
    * Transmissão
    * Visualização
    * Exibição do chat e interação no `Chat`

- **Chat**
    * Comunicação em tempo real entre os participantes
    * Armazena as menssagens
    * Envia as menssagens para uma fila
