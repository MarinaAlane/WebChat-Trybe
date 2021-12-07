const generateDate = require('../utils/generateDate');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', async ({ chatMessage, nickname }) => {
    const messageDate = await generateDate();
    const message = `${messageDate} - ${nickname}: ${chatMessage}`;
    console.log(message);
    io.emit('message', message);
  });
});