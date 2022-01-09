const now = require('moment')().format('DD-MM-YYYY h:mm:ss A');

const userMessageFormatter = require('../utils/userMessageFormatter');
const ModelMessage = require('../models/messageHistory');

let usersOnline = [];
let userNickname = '';

const generateUserId = (socket) => {
  const userId = socket.id.slice(0, 16);
  usersOnline.push(userId);
  return userId;
};

const renderMessageHistory = async (socket) => {
  // [x] - Criar no model o evento das messages;
  const historyMessages = await ModelMessage.getAllMessages();

  // [x] - Receber esse evento no front;
  socket.emit('renderMessageHistory', historyMessages
    .map(({ message, nickname, timestamp }) => `${timestamp} - ${nickname}: ${message}`));
};

const onConnect = async (io, socket) => {
  userNickname = generateUserId(socket);
  // [X] 1º - Remover o envio do nickName e fazer um evento próprio;
  io.emit('userConnected', usersOnline);
  socket.emit('setUserId', { userNickname, usersOnline });
  await renderMessageHistory(socket);
  return userNickname;
};

module.exports = (io) => io.on('connection', (socket) => {
  // [X] - JOGAR PARA FORA TODA A INICIALIZAÇÃO DO SOCKET 
  onConnect(io, socket);

  // [X] - Após emitir a mensagem é preciso salvar ela no DB com formato específico;  
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', userMessageFormatter(nickname, chatMessage));
    await ModelMessage.createMessage({ message: chatMessage, nickname, timestamp: now });
  });

  socket.on('changeNickname', (name) => {
    usersOnline = usersOnline.map((user) => (user === userNickname ? name : user));
    userNickname = name;
    io.emit('changeUsersName', usersOnline);
    socket.emit('setUserId', { userNickname, usersOnline });
  });

  socket.on('disconnect', () => {
    const userIndex = usersOnline.indexOf(userNickname);
    usersOnline = usersOnline.filter((_, index) => index !== userIndex);
    io.emit('userDisconnected', usersOnline);
  }); 
});
