const express = require('express');

const app = express();

const { join } = require('path');
const cors = require('cors');

const PORT = 3000;

const http = require('http').createServer(app); // criando um servidor http
const io = require('socket.io')(http, { // usando o servidor pra poder rodar o socket.io
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io 
    origin: `http://localhost:${PORT}`, // origem permitida
    methods: ['GET', 'POST'], // métodos permitidos
  },
});

require('./sockets/socket')(io); // faz a importação do io que cria a conexão

app.use(express.static(join(__dirname, 'public')));

app.use('/', (req, res) => {
  res.render((join(__dirname, 'public'), 'index.html'));
});

app.use(express.json());
app.use(cors());

http.listen(PORT, console.log(`Socket.io rodando na porta ${PORT}!`));
