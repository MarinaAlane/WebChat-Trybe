module.exports = (io) => {
  io.on('connection', (socket) => {
    // socket.broadcast.emit('loginMessage', `${nickname} acabou de entrar!`);

    socket.on('message', (data) => {
      /* Como transformar a data para o formato desejado: https://blog.betrybe.com/javascript/javascript-date/#4 */
      const date = new Date();
      const currentlyDate = `${date.getDate()}-${date.getMonth() + 1}-${date
        .getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`;
      const chatMessage = `${currentlyDate} - ${data.nickname}: ${data.chatMessage}`;

      io.emit('message', chatMessage);
    });

    // socket.on('disconnect', () => {
    //   socket.broadcast.emit('logoutMessage', `${nickname} acabou de sair!`);
    // });
  });
};