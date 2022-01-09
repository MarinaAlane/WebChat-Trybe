// estrutura os eventos
// https://momentjs.com/
const moment = require('moment');
const model = require('../models/chat');

const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss a');
// console.log({ date });

const message = ({ chatMessage, nickname }) =>
  `${date} - ${nickname}: ${chatMessage}`;
// console.log({ message });

module.exports = (io) =>
  io.on('connection', async (socket) => {
  console.log(`Usuário ${socket.id} conectado`);
  socket.on('message', (data) => {
    model.saveMessage(data);
    io.emit('message', message(data));
  }); // adiciona uma função e escuta um evento

// socket.emit('welcomeMessage', ('Olá, bem vindos!'));

  const history = await model.getAll();
  // console.log({ history });
  // io.emit('history', history);

  io.emit('history', history
    .map(({ messages, ...prev }) => message({ chatMessage: messages, ...prev })));

});
