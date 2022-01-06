const moment = require('moment');
const messagesModels = require('../models/messagesModels');

const online = [];

const createUser = (socket) => { // criando a função para gerar um usuário com 16 caracteres, utilizando o próprio "id" gerado pelo socket
  const { id } = socket;
  const newId = id.substr(0, 16); // a substring vai contar 16 caracteres começando já do primeiro
  online.push({ id, nickname: newId }); // inserindo os usuários conectados com o id do socket e o nickname com o novo id gerado
  socket.emit('newUser', newId);
};

const newMessage = (socket, io) => {
  const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A');
  socket.on('message', async (message) => {
    io.emit('message', `${timestamp} - ${message.nickname}: ${message.chatMessage}`);
    await messagesModels.createMessages(message.nickname, message.chatMessage, timestamp); // criando a mensagem e armazenando no banco de dados
  });
};

const getMessages = async (socket) => {
  const messages = await messagesModels.getAllMessages();
  socket.emit('allMessages', messages);
};

const saveNickname = async (socket, io) => { // ao salvar o nickname ele é atualizado pra todos conectados no chat
  socket.on('saveNickname', (nickname) => {
    const userIndex = online.findIndex((user) => user.id === socket.id);
    online[userIndex].nickname = nickname;
    io.emit('usersOnline', online); // emite para o cliente os usuários conectados
  });
};

const usersOnline = (socket, io) => {
  socket.on('usersOnline', () => {
    io.emit('usersOnline', online);
  });
};

const disconnectUser = (socket, io) => {
  socket.on('disconnect', () => {
    const userIndex = online.findIndex((user) => user.id === socket.id);
    online.splice(userIndex, 1); // remove o cliente de acordo com o index gerado em userIndex
    io.emit('usersOnline', online);
  });
};

module.exports = (io) => { // arquivo exportado para o server
  io.on('connection', (socket) => { // estabelecendo conexão com o io e executando as funções
    createUser(socket);
    newMessage(socket, io);
    getMessages(socket);
    saveNickname(socket, io);
    usersOnline(socket, io);
    disconnectUser(socket, io);
  });
};
