const moment = require('moment');

const messageMoment = moment().format('MM-DD-YYYY h:mm:ss A');
const Users = require('./users');
const { addNewMessage } = require('../models/messages');

module.exports = (io) => io.on('connection', (socket) => {
  Users(socket, io);
  
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${messageMoment} - ${nickname}: ${chatMessage}`);
    await addNewMessage({ messageMoment, chatMessage, nickname });
  });
});