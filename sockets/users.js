const randomNickname = () => {
    const randomEightChar = Math.random().toString(36).substr(2, 8);
    return randomEightChar + randomEightChar;
  };
  module.exports = (io) => io.on('connection', (socket) => {
    let username = randomNickname();
    socket.emit('username', username);
  
    socket.broadcast.emit('loggedUser', username);
  
    socket.on('updateUsername', (data) => {
      io.emit('updateUsername', { oldUsername: username, newUsername: data });
      username = data;
    });
  
    socket.on('loggedUser', (data) => {
      socket.broadcast.emit('addLoggedUsers', data);
    });
  
    socket.on('disconnect', () => {
      io.emit('removeUser', username);
    });
  });