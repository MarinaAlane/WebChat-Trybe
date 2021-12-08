module.exports = (io) => io.on('connection', (socket) => {
    let userNickName = '';
  
    socket.on('userSignIn', (nickName) => {
      userNickName = nickName;
      socket.broadcast.emit('userSignIn', nickName);
    });
  
    socket.on('updateUserName', (user) => {
      socket.broadcast.emit('updateUserName', { prevName: userNickName, currName: user });
      userNickName = user;
    });
  
    socket.on('loggedUsers', (loggedUser) => socket.broadcast.emit('loggedUsers', loggedUser));
  
    socket.on('disconnect', () => io.emit('removeUser', userNickName));
  
    socket.on('removeUser', (user) => io.emit('removeUser', user));
  });