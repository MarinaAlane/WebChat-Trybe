const generateDate = require('../utils/dateGenerate');

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('newUser', (nick) => {
    socket.emit('userOn', nick);
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const messageDate = await generateDate();
    const name = nickname || socket.id;
    const message = `${messageDate} - ${name}: ${chatMessage}`;
    io.emit('message', message);
  });
});