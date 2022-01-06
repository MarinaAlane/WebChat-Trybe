const express = require('express');
const path = require('path');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

  const messageController = require('./controllers/messageController');
  const messageModel = require('./models/messageModel');  

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', messageController.listMessages);

io.on('connection', (socket) => {
  socket.on('message', async (post) => {
    const { nickname, chatMessage } = post;
    const data = moment().format('DD-MM-yyyy HH:mm:ss A');
    const message = `${data} - ${nickname} ${chatMessage}`;
    io.emit('message', message);
    await messageModel.insertMessage(chatMessage, nickname, data);
  });
});

http.listen(PORT, () => {
  console.log(`Rodando na porta ${PORT}`);
}); 