const onlineList = [];
const modelChat = require('../models/modelChat');

const newUser = (socket, io) => {
  socket.on('new-user', (user) => {
    onlineList.push({ id: socket.id, nickname: user });
    console.log(onlineList);
    io.emit('online', onlineList);
  });
};

const editUser = (socket, io) => {
  socket.on('edit-user', (user) => {
    console.log(user);
    const indexUser = onlineList.findIndex((item) => item.id === socket.id);
    onlineList[indexUser].nickname = user;
    console.log(onlineList);
    io.emit('online', onlineList);
  });
};

const offlineUser = (socket, io) => {
  socket.on('disconnect', () => {
    console.log(`Um usuário desconectou de ${socket.id}`);
    const indexUser = onlineList.findIndex((item) => item.id === socket.id);
    onlineList.splice(indexUser, 1);
    console.log(onlineList);
    io.emit('online', onlineList);
  });
};

const messageVal = (socket, io) => {
  socket.on('message', async (message) => {
    const dateMessage = new Date();
    const timeMessage = dateMessage.toLocaleTimeString();
    const formattedDateMessage = dateMessage.toLocaleDateString().replaceAll('/', '-');
    const formattedMessage = `${formattedDateMessage} ${timeMessage}
    -${message.nickname}: ${message.chatMessage}`;

    await modelChat.insertMessage(
      { nickname: message.nickname,
        message: message.chatMessage,
        timestamp: `${formattedDateMessage} ${timeMessage}` },
    );
    io.emit('message', formattedMessage);
    console.log(dateMessage, timeMessage, formattedDateMessage, formattedMessage);
  });
};

const chat = async (io) => {
  io.on('connection', (socket) => {
    newUser(socket, io);
    editUser(socket, io);

    console.log(`Um usuário conectou em ${socket.id}`); 

    offlineUser(socket, io);

    messageVal(socket, io);
  });
};

module.exports = chat;
