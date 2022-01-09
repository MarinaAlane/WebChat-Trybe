const now = require('moment')().format('DD-MM-YYYY h:mm:ss A');

const userMessageFormatter = require('../utils/userMessageFormatter');
const ModelMessage = require('../models/messageHistory');

let usersOnline = [];

const generateUserId = (socket) => {
  const userId = socket.id.slice(0, 16);
  usersOnline.push(userId);
  return userId;
};

const renderMessageHistory = () => {

};

module.exports = (io) => io.on('connection', (socket) => {
  let userNickname = generateUserId(socket);

  // [ ] - JOGAR PARA FORA TODA A INICIALIZAÇÃO DO SOCKET 
  renderMessageHistory(io, socket);

  // [X] 1º - Remover o envio do nickName e fazer um evento próprio;
  io.emit('userConnected', usersOnline);
  socket.emit('setUserId', { userNickname, usersOnline });

  // [ ] - Após emitir a mensagem é preciso salvar ela no DB com formato específico;  
  socket.on('message', async ({ nickname, chatMessage }) => {
    io.emit('message', userMessageFormatter(nickname, chatMessage));
    await ModelMessage.createMessage({ message: chatMessage, nickname, now  });
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
