const { dateGenerator } = require('../helpers/helpers');
const { createMessage, getAllMessages } = require('../models/messagesModel');

module.exports = (io) => {
  io.on('connection', async (socket) => {  
    const messages = await getAllMessages();
    console.log(messages);
    socket.emit('loadMessages', (messages));
    socket.on('message', async ({ chatMessage, nickname }) => {
      const nick = nickname;
      const date = dateGenerator();
      const data = {
        message: chatMessage,
        nickname: nick,
        timestamp: date,
      };
      await createMessage(data);
      io.emit('message', `${date} - ${nick}: ${chatMessage}`);
    });

    // socket.on('disconnect', () => {
    //   console.log(`usuário ${socket.id} desconectouu`);
    // });
  });
};
