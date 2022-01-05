const dayjs = require('dayjs');
// const { randomBytes } = require('crypto');

const currentDate = dayjs().format('DD-MM-YYYY hh:mm:ss ');
// const randomUser = randomBytes(18).toString('hex');

module.exports = (io) => io.on('connection', (socket) => {
    // socket.emit('serverMessage', 'Olá, seja bem vindo ao nosso chat público! Use essa página para conversar a vontade.');
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${currentDate} ${nickname} ${chatMessage}`);
    });
  });
