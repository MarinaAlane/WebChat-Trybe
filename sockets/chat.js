let arrayUsers = [];

module.exports = (io) => io.on('connection', (socket) => { 
  socket.on('message', ({ chatMessage, nickname }) => {   
    const timeHour = new Date().toLocaleTimeString('pt-br', { hour12: true });
    const day = (new Date().toLocaleDateString()).replace(/\//g, '-');
    const time = `${day} ${timeHour}`;
    const userMessage = `${time} ${nickname} ${chatMessage}`;
    io.emit('message', userMessage);
  });

  socket.on('new-user', ({ user, userOld }) => {
    const userExists = arrayUsers.find((element) => element === userOld);
    if (userExists) {
      const index = arrayUsers.indexOf(userExists);
      arrayUsers[index] = user;
    } else {
      arrayUsers.push(user);
    }
    io.emit('update-nicknames', arrayUsers);
  });

socket.on('event', (arr) => {
  arrayUsers = [];
  arrayUsers = [...arr];
  io.emit('update-nicknames', arrayUsers);
})

});