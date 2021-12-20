const moment = require('moment');
const { createMessage, getAllMessages } = require('../models/chatModel');

// Array que armazena todos os usuários
let users = [];

module.exports = (io) => {
  io.on('connection', async (socket) => {
    // Cria um id de 16 caracteres
    let userId = socket.id.substring(0, 16); users.push(userId);

    // Emite um evento de conexão para todos os usuários passando o array USERS
    io.emit('connection', users);

    // Emite um evento para enviar o ID ao cliente
    socket.emit('throwId', { userId, users });

    // Escuta um evento de disconnect, removendo o usuário desconectado do array users;
    socket.on('disconnect', 
    () => { users = users.filter((user) => userId !== user); io.emit('discon', users); });

    // Escuta um evento message do cliente, que receberá a mensagem e o nickname
    socket.on('message', async ({ chatMessage, nickname }) => {
      // https://stackoverflow.com/questions/30158574/how-to-convert-result-from-date-now-to-yyyy-mm-dd-hhmmss-ffff
      // https://momentjs.com/
      // Cria um date no formato especificado
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');

      // Cria uma mensagem personalizada e retorna aos clientes
      const message = `${date} - ${nickname}: ${chatMessage}`;
      io.emit('message', message); await createMessage(chatMessage, nickname, date);
    });

    socket.on('changeNickname', (name) => {
      users = users.map((user) => (user === userId ? name : user));
      userId = name;
      io.emit('changeUsersName', users);
      socket.emit('throwId', userId);
    }); socket.emit('connectedMessages', await getAllMessages());
  });
};
