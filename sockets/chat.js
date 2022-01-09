const userList = [];

module.exports = (io) => io.on('connection', (socket) => {
  let username = socket.id.slice(0, 16); userList.push(username);
  io.emit('userConnected', { userList, username });

  socket.on('message', ({ chatMessage, nickname }) => {
    const date = new Date().toLocaleString('pt-BR');
    const formatedDate = date.replace(/\//g, '-');
    io.emit('message', `${formatedDate} ${nickname}: ${chatMessage}`);
  });

  socket.on('changeNick', (newNick) => {
    const index = userList.indexOf(username); username = newNick;
    userList[index] = username;
    io.emit('nickChanged', userList);
  });

  socket.on('disconnect', () => {
    const index = userList.indexOf(username);
    userList.splice(index, 1);
    io.emit('userDisconnected', userList);
  });
});