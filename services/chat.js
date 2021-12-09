const moment = require('moment');
const MessageController = require('../controllers/Message');

const getParsedMessage = ({ chatMessage, nickname, timestamp }) => {
  const displayTimestamp = moment(timestamp).format('DD-MM-YYYY h:mm:ss A');
  const message = `${displayTimestamp} - ${nickname}: ${chatMessage}`;
  return message;
};

let connectedClients = [];

const emitClientList = (io) => io.emit('client-list', connectedClients);

const handleMessageEvent = ({ chatMessage, nickname, io }) => {
  const now = new Date();
  MessageController.createNewMessage({ chatMessage, nickname, timestamp: now.toISOString() });
  const message = getParsedMessage({ chatMessage, nickname, timestamp: now });
  io.emit('message', message);
};

const handleNewClientEvent = ({ nickname, socket, io }) => {
  connectedClients.push(nickname);
  emitClientList(io);
  console.log(connectedClients);
  Object.defineProperty(socket, 'nickname', { value: nickname, writable: true });
};

const handleChangeNicknameEvent = ({ newNickname, socket, io }) => {
  connectedClients = connectedClients.map((nickname) => 
    (nickname === socket.nickname ? newNickname : nickname));
  Object.defineProperty(socket, 'nickname', { value: newNickname, writable: true });
  emitClientList(io);
};

const handleDisconnectEvent = ({ socket, io }) => {
  console.log('disconnected');
  connectedClients = connectedClients.filter((nickname) => nickname !== socket.nickname);
  console.log(socket.nickname);
  emitClientList(io);
};

const connect = (io) => {
  io.on('connection', (socket) => {
    socket.emit('ping');

    socket.on('pong', () => {
      console.log('pong recebido');
    });

    socket.on('message', (event) => handleMessageEvent({ ...event, io }));

    socket.on('new-client', (event) => handleNewClientEvent({ ...event, socket, io }));

    socket.on('change-nickname', (event) => handleChangeNicknameEvent({ ...event, socket, io }));

    socket.on('disconnect', (event) => handleDisconnectEvent({ ...event, socket, io }));
  });
};

module.exports = { chat: { connect, getParsedMessage } };
