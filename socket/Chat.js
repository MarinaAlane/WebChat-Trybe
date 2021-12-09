const moment = require('moment');
const axios = require('axios');

let arrId = [];

const setMessages = (chatMessage, nickname, io) => {
  const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
  io.emit('message', `${date} - ${nickname}: ${chatMessage}`);
  axios.post('http://localhost:3000', { message: chatMessage, nickname, timestamp: date });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    let id = socket.id.substring(0, 16);
    arrId.push(id);
    socket.broadcast.emit('connection', id);
    socket.emit('connection_users', arrId);
    socket.on('alterUsername', ({ oldNickname, userNickname }) => {
      id = userNickname;
      arrId = arrId.map((value) => (value === oldNickname ? userNickname : value));
      socket.broadcast.emit('updateUsers', oldNickname, userNickname);
      });
    socket.on('message', ({ chatMessage, nickname }) => {
      setMessages(chatMessage, nickname, io);
    });
    socket.on('disconnect', () => {
      arrId = arrId.filter((value) => value !== id);
      socket.broadcast.emit('disconnect_user', id);
    });
  });
};
