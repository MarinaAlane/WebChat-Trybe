module.exports = (io) => {
    io.on('connection', (socket) => {
      // Code from test req02 => expect(givenNickname[0]).toMatch(/^[\w'-]{16}$/);
      let username = socket.id.slice(-16);
      socket.emit('setUser', username);
      socket.broadcast.emit('addUser', username);
      socket.on('addUser', (data) => {
        socket.broadcast.emit('newLoggedUser', data);
      });
      socket.on('updateName', (data) => {
        io.emit('updateName', { oldUsername: username, newUsername: data });
        username = data;
      });
      socket.on('disconnect', () => {
        io.emit('userLeft', username);
      });
    });
  };