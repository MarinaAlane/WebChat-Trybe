const express = require('express'); 
const path = require('path'); 

const app = express();

const http = require('http').createServer(app); // importação do http + criação de um server

const PORT = process.env.PORT || 3000; // usando porta 3000 ou variavel de ambiente

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, './views/index.html'));
});

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

/*
Implementação a instância do socket.io usando a função io e passando dois parâmetros:
O objeto http que é um servidor HTTP;
Um objeto options para definir a regra de CORS para definir que vamos aceitar conexões 
do cliente que acessar pela URL http://localhost:3000 usando verbos GET e POST. 
*/

io.on('connection', (socket) => {
  console.log(`Usuário conectado -> ${socket.id}`);
});

/*
Essa função vai ser executada sempre que um novo client se conectar ao servidor
nome e parâmetro socket. -> Este parâmetro é a representação de uma conexão aberta ao 
socket-io rodando no back-end. No objeto socket usamos um atributo id que é uma string 
aleatória que é gerada a cada nova conexão.
*/

http.listen(PORT, () => {
  console.log(`Ouvindo na porta-> ${PORT}`);
});
