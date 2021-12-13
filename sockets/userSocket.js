const { randomNickGenerator } = require('../helpers/helpers');

module.exports = (io) => {
  io.on('connection', async (socket) => {
    const randomNick = randomNickGenerator(16);

    console.log(`usuário ${randomNick} conectado`);

    socket.emit('setUser', (randomNick));
    
    socket.broadcast.emit('userLogin', randomNick);
    
    socket.on('userLogin', (nickname) => {
      socket.broadcast.emit('addClient', nickname);
    });

    socket.on('nickname', (nickname) => {
      const nickTest = { nickname, randomNick };
      io.emit('nickname', nickTest);
    });
    
    socket.on('disconnect', () => {
      socket.broadcast.emit('removeUser', randomNick);
      console.log(`usuário ${randomNick} desconectou`);      
    });
  });
};
