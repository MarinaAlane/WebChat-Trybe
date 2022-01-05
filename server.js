const express = require('express');
const http = require('http');
// const cors = require('cors');
// const bodyParser = require('body-parser');
const path = require('path');
const { Server } = require('socket.io');

const app = express();

const server = http.createServer(app);

const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/index.html'));
});
function formatAMPM(hora) {
  const objeto = {
    hora,
    meridion: 'AM',
  };
  if (hora >= 13) {
    objeto.hora = hora - 12;
    objeto.meridion = 'PM';
  }
  return objeto;
}
function createMessage() {
  const dateNow = Date.now();
  const dia = new Date(dateNow).getDate();
  const mes = (new Date(dateNow).getMonth()) + 1;
  const ano = new Date(dateNow).getFullYear();
  const hor = formatAMPM(new Date(dateNow).getHours());
  const min = new Date(dateNow).getMinutes();
  const sec = new Date(dateNow).getSeconds();
  const data = `${dia}-${mes}-${ano} ${hor.hora}:${min}:${sec} ${hor.meridion}`;
  return data;
}

io.on('connection', (socket) => {
  console.log(`a user ${socket.id} connected`);
  socket.on('message', (message) => {
    console.log(message);
    const data = createMessage();
    io.emit('message', `${data} ${message.nickname}: ${message.chatMessage}`);
  });
});

server.listen(3000, () => console.log('server online'));