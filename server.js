// Faça seu código aqui
require('dotenv').config();

const express = require('express');
// https://moment.github.io/luxon/#/tour
const { DateTime } = require('luxon');
const path = require('path');

const app = express();

const { Server } = require('socket.io');
const http = require('http').createServer(app);
const messages = require('./models/messages');

const io = new Server(http);
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

function generateToken(length) {
  // https://www.ti-enxame.com/pt/javascript/crie-um-token-aleatorio-em-javascript-com-base-nos-detalhes-do-usuario/941136694/
  const a = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
      const j = (Math.random() * (a.length - 1)).toFixed(0);
      b[i] = a[j];
  }
  return b.join('');
}

let clientes = [];

function formataCliente(cliente) {
  return { nome: cliente.nickname || cliente.id };
}

function notificaTodosListaDeClientes() {
  const listaDeClientes = clientes.map(formataCliente);

  clientes.forEach((clienteExistente) => {
    clienteExistente.socket.emit('clientes-logados', listaDeClientes);
  });
}

const disconect = (socket) => {
  socket.on('disconnect', () => {
    clientes = clientes.filter(((c) => c.socket.id !== socket.id));
    notificaTodosListaDeClientes();
  });
};

io.on('connection', async (socket) => {
  const cliente = { id: generateToken(16), socket, nickname: null };
  clientes.push(cliente);
  socket.emit('logado', cliente.id);
  notificaTodosListaDeClientes();

  socket.on('nickname', (nickname) => {
    cliente.nickname = nickname;
    notificaTodosListaDeClientes();
  });
  disconect(socket);
  const messagens = await messages.getAll();

  socket.emit('messagens-DB', messagens);

  socket.on('message', async (msg) => {
    const novaMsg = JSON.parse(JSON.stringify(msg));    

    novaMsg.time = DateTime.now().toFormat('dd-LL-yyyy hh:mm:ss');
    await messages.insert(novaMsg);
    io.emit('message', `${novaMsg.time} ${novaMsg.nickname}: ${novaMsg.chatMessage}`); 
});
});

http.listen(PORT, () => {
  console.log(`Servidor HTTP ouvindo na porta ${PORT}`);
});
