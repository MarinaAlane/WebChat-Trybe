const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const { format } = require('date-fns');
const { sendMsgDb, getMsgDb } = require('./models/Webchat');

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const users = {};

io.on('connection', async (socket) => {
  const nick = socket.id.slice(1, 17);
  users[nick] = nick;
  socket.emit('firstNick', nick); io.emit('connection', users);

  socket.on('nick', (newNick) => {
    users[nick] = newNick; io.emit('connection', users);
  });
  
  socket.on('disconnect', () => {
    delete users[nick]; io.emit('connection', users);
  });

  socket.on('message', async (msg) => {
    const { nickname } = msg;
    const timestamp = format(new Date(), 'dd-mm-yyyy hh:mm:ss');
    
    io.emit('message', `${timestamp} - ${nickname}: ${msg.message || msg.chatMessage}`);
    await sendMsgDb({ timestamp, nickname, chatMessage: msg.chatMessage || msg.message });
  });

  const getMsgs = async () => {
    const mensagens = await getMsgDb(); return mensagens; 
  }; io.emit('dbMsgs', await getMsgs());
});

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
