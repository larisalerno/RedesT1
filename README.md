## Laboratório de Redes (Show do UDPzão)

O trabalho consiste em criar um jogo cliente-servidor utilizando sockets.

O transporte deverá ser feito em UDP, implementando a confirmação de recebimento do pacote por parte tanto do cliente quanto do servidor.

## Passo a passo para executar o jogo

1. Clone o repositório do projeto
2. Na pasta do projeto, digite ```npm install```
3. Compile o projeto com o comando ```npm run tsc```
4. Execute o cliente e o servidor do jogo, cada um em um terminal separado, com os comandos abaixo:

  *   ```$ node build/index.js``` para executar o servidor.

  *   ```$ node build/client/udpClient.js``` para executar o cliente.
  
5. Siga as instruções que aparecerão na tela para estabelecer a comunicação do client com o servidor e iniciar uma partida.

