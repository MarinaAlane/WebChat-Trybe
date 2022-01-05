module.exports = (io) => io.on('connection', (socket) => {
  socket.broadcast.emit('serverMessage', console.log(`${socket.id} acabou de se conectar :D`));

  // https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
  socket.on('message', (message) => {
    const date = new Date();
    const dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
    const hourFormat = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    io.emit('message', `${dateFormat} ${hourFormat} - ${message.nickname}: ${message.chatMessage}`);
  });

  socket.on('nickname', (nickname) => {
    io.emit('nickname', nickname);
  });
});