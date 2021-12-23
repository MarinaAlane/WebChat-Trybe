const express = require('express'); // importação do express

const app = express(); // o app recebe o express

const { resolve } = require('path'); // o resolve para apontar o caminho da pasta public e do arquivo html
const cors = require('cors'); // o cors  é um recurso para utilizar a origem cruzada (front e back end) da aplicação e seus métodos permitidos

const PORT = 3000; // porta utilizada na aplicação

const http = require('http').createServer(app); // criando um servidor http
const io = require('socket.io')(http, { // usando o servidor pra poder rodar o socket.io
  cors: { // Aqui existe um objeto de configuração, essas options são necessárias a partir da major 3 do socket.io 
    origin: `http://localhost:${PORT}`, // origem permitida
    methods: ['GET', 'POST'], // métodos permitidos
  },
});

require('./sockets/socket')(io); // faz a importação do io que cria a conexão feito na linha 11

app.use(express.static(resolve(__dirname, 'public'))); // aponta o caminho do diretório

app.use('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'public', 'index.html')); // aponta o caminho do arquivo para ser renderizado
});

app.use(express.json()); // simplifica a comunicação navegador servidor, permitindo a troca de JSON no campo da solicitação
app.use(cors()); // é um middleware de compartilhamento de recursos de origem cruzada (back e front end)

http.listen(PORT, console.log(`Socket.io rodando na porta ${PORT}!`)); // ouvindo o servidor da aplicação com o socket.io
