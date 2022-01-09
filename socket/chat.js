const moment = require('moment');

const socketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('servidor conectado');

    const { id } = socket;
    const newId = id.substr(0, 16);

    socket.emit('user', newId);

    // socket.on('salvarName');

    socket.on('message', ({ nickname, chatMessage }) => {
      const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');

      io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    });
  }); 
};

module.exports = socketIo;