const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

const { Server } = require('socket.io');
const http = require('http').createServer(app);

const controller = require('./controllers/chatController');

const io = new Server(http);

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

function generateToken(length) {
  const a = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'.split('');
  const b = [];  
  for (let i = 0; i < length; i += 1) {
    const j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join('');
}

const dateFormat = () => {
  const addZero = (n) => {
    if (n <= 9) return `0${n}`;
    return n;
  };
  const date = new Date();
  const day = date.getDate().toString().padStart();
  const month = (date.getMonth() + 1).toString().padStart('0');
  const year = date.getFullYear();
  const hours = date.getHours().toString();
  const min = date.getMinutes().toString();
  const sec = date.getSeconds().toString();
  return `${addZero(day)}-${addZero(month)}-${year} ${hours}:${min}:${sec} `;
};

let clients = [];

const infoClients = () => {
  const listClient = clients.map((client) => ({
    name: client.nickname || client.id,
  }));

  clients.forEach((client) => {
    client.socket.emit('clientLogged', listClient);
  });
};

const disconnect = (socket) => {
  socket.on('disconnect', () => {
    clients = clients.filter((client) => client.socket.id !== socket.id);
    infoClients();
  });
  infoClients();
};

io.on('connection', async (socket) => {
  const client = { id: generateToken(16), socket, nickname: null };
  clients.push(client);
  socket.emit('logged', client.id);
  infoClients();

  socket.on('nickname', (nickname) => {
    client.nickname = nickname;
    infoClients();
  });

  infoClients();

  disconnect(socket);
  const messages = await controller.getAllMessages();

  socket.emit('messagesDB', messages);

  socket.on('message', async (msg) => {
    const newMessage = JSON.parse(JSON.stringify(msg));
    newMessage.time = dateFormat();
    await controller.createMessage(newMessage);
    io.emit('message', `${newMessage.time} ${newMessage.nickname}: ${newMessage.chatMessage}`);
  });
});

http.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
