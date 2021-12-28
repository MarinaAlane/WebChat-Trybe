module.exports = (io) => io.on('connection', (socket) => {
  socket.broadcast.emit('serverMessage', `${socket.id} acabou de se conectar :D`);

  socket.on('message', (message) => {
    // https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript

    const date = new Date();
    const dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
    const hourFormat = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

    io.emit('message', `${dateFormat} ${hourFormat} - ${message.nickname}: ${message.chatMessage}`);
  });
});