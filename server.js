const express = require('express');

const app = express();

const http = require('http').createServer(app); // cria um server http usando o app do express

const PORT = process.env.PORT || 3000; // usando porta 3000 ou variavel de ambiente

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors 
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

/*
Implementando a instância do socket.io usando a função io e passando dois parâmetros
- O objeto http que é um servidor HTTP;
- Um objeto options para definir a regra de CORS para definir que vamos aceitar 
conexões do cliente que acessar pela URL http://localhost:3000 usando verbos GET e POST.
*/

app.use(express.static(`${__dirname}/public`)); // acesso aos arquivos dentro do diretório public adicionando a seguinte linha de código

require('./sockets/chat')(io); // require necessario para o arquivo chat.js ter acesso ao modulos do io na pasta sockets

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`); // devolve o arquivo chamado /chat.html quando acessa a rota 
});

http.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});