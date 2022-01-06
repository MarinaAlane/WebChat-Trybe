// Faça seu código aqui
const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const moment = require('moment');
const Messages = require('./controllers/Messages');

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', async (socket) => {
  const basNickname = socket.id.slice(0, 16);
  const list = await Messages.getAll();

  // -----------enviar a mensagem------------------------------
  socket.on('message', async (message) => {
    const date = moment().format('DD-MM-YYYY, hh:mm:ss');
    const completeMessage = `${date} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', completeMessage);
    await Messages.create(message.nickname, message.chatMessage, date);
  });
  // -----------enviar a mensagem------------------------------

  // --------envia o historico----------
  socket.emit('getMessages', list);
  // --------envia o historico----------

  io.emit('newUser', basNickname);

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} desconectado`);
  });
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
