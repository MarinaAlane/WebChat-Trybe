const moment = require('moment');
const messagesModels = require('../models/messagesModels');

const online = []; // Req. 4 - array criado para armazenar os usuários conectados

const createUser = (socket) => { // Req. 2 - criando a função para gerar um usuário com 16 caracteres, utilizando o próprio "id" gerado pelo socket
  const { id } = socket; // o id é desestuturado do socket
  const newId = id.substr(0, 16); // a substring vai contar 16 caracteres começando já do primeiro
  online.push({ id, nickname: newId }); // Req. 4 - inserindo os usuários conectados com o id do socket e o nickname com o novo id gerado
  socket.emit('newUser', newId); // Req. 2 - emitindo para o front end o novo usuário conectado no chat
};

const newMessage = (socket, io) => { // Req. 1 - a mensagem será formatada conforme o requisito
  const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A'); // utilizada a lib moment para formatar a data de acordo com o requisito 1.
  socket.on('message', async (message) => { // ouvindo a mensagem digitada pelo usuário e executando a função abaixo
    io.emit('message', `${timestamp} - ${message.nickname}: ${message.chatMessage}`); // emitindo a mensagem já formatada para o usuário no front end
    await messagesModels.createMessages(message.nickname, message.chatMessage, timestamp); // Req. 3 - criando a mensagem e armazenando no banco de dados
  });
};

const getMessages = async (socket) => { // Req. 3 - buscando as mensagens no banco de dados
  const messages = await messagesModels.getAllMessages();
  socket.emit('allMessages', messages); // Req. 3 - emitindo as mensagens para os usuários do chat
};

const saveNickname = async (socket, io) => { // Req. 2 - ao salvar o nickname ele é atualizado pra todos conectados no chat
  socket.on('saveNickname', (nickname) => { // está ouvindo o usuário salvo
    const userIndex = online.findIndex((user) => user.id === socket.id); // vai procurar no array e verificar se o id do usuário corresponde ao id do socket, ele retorna o primeiro índice que corresponde
    online[userIndex].nickname = nickname; // ao encontrar o id correspondente ele acessa o nickname e seta o nickname informado pelo usuário
    io.emit('usersOnline', online); // emite para o cliente os usuários conectados
  });
};

const usersOnline = (socket, io) => { // Req. 4 - essa função
  socket.on('usersOnline', () => { // ouve os usuários online 
    io.emit('usersOnline', online); // e emite para todos que estão online ao carregar o chat
  });
};

const disconnectUser = (socket, io) => { // Req. 4 - função que mostra quem se desconectou
  socket.on('disconnect', () => { // ouve o cliente que saiu do chat
    const userIndex = online.findIndex((user) => user.id === socket.id); // compara seu id com o id do socket
    online.splice(userIndex, 1); // remove o cliente de acordo com o index gerado em userIndex
    io.emit('usersOnline', online); // emite para todos, os clientes que estão oline
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
