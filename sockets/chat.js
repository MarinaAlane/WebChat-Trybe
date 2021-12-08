const arrayUsers = [];

module.exports = (io) => io.on('connection', (socket) => { 
  socket.on('message', ({ chatMessage, nickname }) => {   
    const timeHour = new Date().toLocaleTimeString('pt-br', { hour12: true });
    const day = (new Date().toLocaleDateString()).replace(/\//g, '-');
    const time = `${day} ${timeHour}`;
    const userMessage = `${time} ${nickname} ${chatMessage}`;
    io.emit('message', userMessage);
  });

  socket.on('new-user', ({ user, userOld }) => {
    const userExists = arrayUsers.find((element) => element.user === userOld);
    if (userExists) {
      const index = arrayUsers.indexOf(userExists);
      arrayUsers[index].user = user;
    } else {
      arrayUsers.push({user, socket});
    }
    io.emit('update-nicknames', arrayUsers.map(({user}) => ({ user })));
  });

socket.on('disconnect', () => {
 arrayUsers.splice(arrayUsers.indexOf(arrayUsers.find((element)=> element.socket === socket)),1);
  console.log(arrayUsers)
  io.emit('update-nicknames', arrayUsers.map(({user}) => ({ user })))
});

});