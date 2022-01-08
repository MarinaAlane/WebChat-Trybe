const moment = require('moment');

const { saveMessage, getAllMessages } = require('../models/chat');

const date = moment().format('DD-MM-yyyy HH:mm:ss A');

const connect = async (socket) => {
  const messages = await getAllMessages();
  socket.emit('loadMessages', messages);
};

module.exports = (io) => io.on('connection', (socket) => {
  connect(socket);
  
  socket.on('message', async ({ nickname, chatMessage }) => {
    const message = chatMessage;
    await saveMessage({ message, nickname, date });

    io.emit('message', 
    `${date} - ${nickname}: ${chatMessage}`);    
  });

  socket.on('disconnect', () => {
    console.log(`Usuário ${socket.id} acabou de se desconectar`);
  });
});
