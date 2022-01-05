const moment = require('moment');
const { addMsg, getAll } = require('../models/msgsModel');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const today = moment().format('DD-MM-yyyy hh:mm:ss A');
    await addMsg({ text: chatMessage, nickname, timestamp: today });
    io.emit('message', `${today} - ${nickname}: ${chatMessage}`);
  });
  socket.on('serverAllMessage', async () => {
    const all = await getAll();
    socket.emit('serverLoadMessage', all);
  });
});
