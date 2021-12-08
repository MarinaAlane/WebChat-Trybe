const dateInform = require('../utils/dateInform');
const { saveMessage } = require('../models/queries');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async (message) => {
    const date = dateInform();
    try {
      await saveMessage(message.chatMessage, message.nickname, date);
    } catch (err) {
      console.log(err);
    }
    if (message.date) {
      return io.emit('message', `${message.date} - ${message.nickname}: ${message.chatMessage}`);
    }
    
    return io.emit('message', `${date} - ${message.nickname}: ${message.chatMessage}`);
  });
});