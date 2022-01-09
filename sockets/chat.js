module.exports = (io) => io.on('connection', (socket) => {
  let userName = socket.id.substring(0, 16);

  io.emit('user', `${userName}`);

  socket.on('userNick', (user) => {
    userName = user;
  });

  // https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
  socket.on('message', (message) => {
    const date = new Date();
    const dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
    const hourFormat = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    io.emit('message', `${dateFormat} ${hourFormat} - ${userName}: ${message.chatMessage}`);
  });
});