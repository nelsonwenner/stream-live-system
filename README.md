<h1 align="center">
    Microservices stream live
</h1>

## System architecture
![export](https://user-images.githubusercontent.com/40550247/83696432-dc8a7c80-a5d2-11ea-81f1-85f67142654e.png)


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

## Communication between systems

* Websockets
* Pub / Sub
* WebRTC
* Queue RabbitMQ
* gRPC