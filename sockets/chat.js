const now = require('moment')().format('DD-MM-YYYY h:mm:ss A');

const userMessageFormatter = require('../utils/userMessageFormatter');
const ModelMessage = require('../models/messageHistory');

let usersOnline = [];

// const generateUserId = (socket) => {
//   const userId = socket.id.slice(0, 16);
//   usersOnline.push(userId);
//   return userId;
// };

const renderMessageHistory = async (socket) => {
  // [x] - Criar no model o evento das messages;
  const historyMessages = await ModelMessage.getAllMessages();

  // [x] - Receber esse evento no front;
  socket.emit('renderMessageHistory', historyMessages
    .map(({ message, nickname, timestamp }) => `${timestamp} - ${nickname}: ${message}`));
};

const onConnect = (io, socket, userId) => {
  // userNickname = generateUserId(socket);
  // [X] 1º - Remover o envio do nickName e fazer um evento próprio;
  io.emit('userConnected', usersOnline);
  console.log('userId', userId);
  socket.emit('setUserId', { userId, usersOnline });
  console.log('connect', userId, usersOnline);
};

module.exports = (io) => io.on('connection', async (socket) => {
  // [X] - JOGAR PARA FORA TODA A INICIALIZAÇÃO DO SOCKET 
  let userId = socket.id.slice(0, 16);
  usersOnline.push(userId);
  onConnect(io, socket, userId);

  // [X] - Após emitir a mensagem é preciso salvar ela no DB com formato específico;  
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', userMessageFormatter(nickname, chatMessage));
    await ModelMessage.createMessage({ message: chatMessage, nickname, timestamp: now });
  });

  socket.on('changeNickname', (name) => {
    usersOnline = usersOnline.map((user) => (user === userId ? name : user));
    userId = name; io.emit('changeUsersName', usersOnline);
    socket.emit('setUserId', { userId, usersOnline });
  });

  await renderMessageHistory(socket);

  socket.on('disconnect', () => {
    usersOnline = usersOnline.filter((user) => userId !== user);
    io.emit('userDisconnected', usersOnline);
  }); 
});
