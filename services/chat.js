const moment = require('moment');
const MessageController = require('../controllers/Message');

const getParsedMessage = ({ chatMessage, nickname, timestamp }) => {
  const displayTimestamp = moment(timestamp).format('DD-MM-YYYY h:mm:ss A');
  const message = `${displayTimestamp} - ${nickname}: ${chatMessage}`;
  return message;
};

const connect = (io) => {
  io.on('connection', (socket) => {
    socket.emit('ping');
    console.log('cliente conectado');

    socket.on('pong', () => {
      console.log('pong recebido');
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      const now = new Date();
      MessageController.createNewMessage({ chatMessage, nickname, timestamp: now.toISOString() });
      const message = getParsedMessage({ chatMessage, nickname, timestamp: now });
      io.emit('message', message);
    });
  });
};

module.exports = { chat: { connect, getParsedMessage } };
