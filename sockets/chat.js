// estrutura os eventos
// https://momentjs.com/
const moment = require('moment');

const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss a');
// console.log({ date });

const message = ({ chatMessage, nickname }) =>
  `${date} - ${nickname}: ${chatMessage}`;
// console.log({ message });

module.exports = (io) =>
  io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('message', (data) => {
    io.emit('message', message(data));
  });
});
