const messageController = require('../controllers/messageController');

const day = new Date().toLocaleDateString('pt-BR').replace(/\//g, '-');
const hour = new Date().toLocaleTimeString('pt-BR', { hour12: true });
const dayTime = `${day} ${hour}`;

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', ({ chatMessage, nickname }) => {
    console.log(`Mensagem ${chatMessage} - ${nickname}`);
    messageController.createMessage(chatMessage, nickname, dayTime);
    io.emit('message', `${dayTime} ${nickname} ${chatMessage}`);
  });

  socket.on('get-message-history', () => {
    messageController.getMessages()
      .then((messages) => {
        io.emit('message-history', messages);
      });
  });
});