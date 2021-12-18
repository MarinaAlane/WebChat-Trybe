/* eslint-disable max-lines-per-function */
const chatController = require('../controllers/chatController');
const userController = require('../controllers/userController');

// prettier-ignore
module.exports = (io) =>
  io.on('connection', (socket) => {
    socket.join('chat_room');
    socket.on('login', async (nickname) => {
      const userList = await userController.createUser({ nickname, socketId: socket.id });
      socket.broadcast.emit('newUserAnnouncement', nickname);
      io.emit('connectedUsers', userList);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      const response = await chatController.createMessage({ message: chatMessage, nickname });
      return io.emit('message', response);
    });

    socket.on('setName', async (data) => {
      const userList = await userController.setName(data);
      console.log(userList);
      socket.broadcast.emit('connectedUsers', userList);
    });
    socket.on('disconnect', async () => {
      try {
      const chatRoom = io.sockets.adapter.rooms.get('chat_room');
      const clients = chatRoom ? [...chatRoom] : [];
      const userList = await userController.cleanUserList(clients);
      console.log({ userList });
      io.emit('connectedUsers', userList);
      } catch (error) {
        console.log(error);
      }
    });
  });
