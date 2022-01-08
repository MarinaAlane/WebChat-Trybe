const moment = require('moment');

const currentDate = moment().format('DD-MM-yyyy hh:mm:ss A');

module.exports = (io) => io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
// socket.on escuta o evento do socket.emit
    socket.on('message', ({ nickname, chatMessage }) => {
        io.emit('message', `${currentDate} - ${nickname} ${chatMessage}`);
      }); 
});
  
// js do backend

// const timestamp = moment().format('DD-MM-yyyy hh:mm:ss A');