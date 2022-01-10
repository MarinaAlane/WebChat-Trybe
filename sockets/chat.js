const fns = require('date-fns');
const messagesModel = require('../models/messagesModel');

async function saveMessageOnDB(chatMessage, nickname, timestamp) {
  await messagesModel.saveMessage(chatMessage, nickname, timestamp);
}

async function getMessages() {
  const messages = await messagesModel.getAll();
  return messages;
}

module.exports = (io) =>
  io.on('connection', async (socket) => {
    const messages = await getMessages();

    socket.emit('getMessages', messages);

    socket.on('message', ({ nickname, chatMessage }) => {
      const date = new Date();
      const formattedDate = fns.format(date, 'dd-MM-yyyy HH:mm:ss');
      saveMessageOnDB(chatMessage, nickname, formattedDate);
      io.emit('message', ` ${formattedDate} - ${nickname}: ${chatMessage}`);
    });
  });
