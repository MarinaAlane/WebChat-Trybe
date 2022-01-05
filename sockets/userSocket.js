const { randomNickGenerator } = require('../helpers/helpers');
const { createUser, 
  findAndUpdateUser, getAllUsers, deleteUser, findById } = require('../models/userModel');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randomNick = randomNickGenerator(16);
    await createUser(randomNick);
    const allUsers = await getAllUsers();
    
    console.log(`usuário ${randomNick} conectado`);

    socket.emit('setUser', ({ randomNick, allUsers }));
    
    socket.broadcast.emit('userLogin', ({ randomNick, allUsers }));
    
    socket.on('nickname', async (nickname) => {
      await findAndUpdateUser(randomNick, nickname);
      const nickTest = { nickname, randomNick };
      io.emit('nickname', nickTest);
    });
    
    socket.on('disconnect', async () => {
      const nickname = await findById(randomNick);
      socket.broadcast.emit('removeUser', nickname);
      await deleteUser(randomNick);
    });
  });
};