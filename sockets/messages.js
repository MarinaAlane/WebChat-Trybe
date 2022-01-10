const moment = require('moment');
const { addMessage } = require('../models/messages');

const formatedDate = moment().format('MM-DD-YYYY h:mm:ss A');

const MessagesIO = (io, socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    io.emit('message', `${formatedDate} - ${nickname}: ${chatMessage}`);
    
    await addMessage({ formatedDate, nickname, chatMessage });
  });
};

module.exports = MessagesIO;