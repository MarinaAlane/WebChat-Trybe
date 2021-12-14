const { newDate } = require('../structures/structures');
const { postNewMessagesController } = require('../controllers/messages');

const parseMessage = ({ chatMessage, nickname, timestamp }) => {
  const message = `${timestamp} - ${nickname}: ${chatMessage}`;
  return message;
};

const postNew = ({ chatMessage, nickname, io }) => {
  const now = newDate();
  postNewMessagesController({ chatMessage, nickname, timestamp: now });
  const object = parseMessage({ chatMessage, nickname, timestamp: now });
  io.emit('message', object);
};

const chat = (io) => {
    io.on('connection', (socket) => {
      // console.log(`usuário ${socket.id} conectou`);
    
      socket.on('message', (event) => postNew({ ...event, io }));
  
      socket.on('new-client', (generateNickName) => {
        const { nickname } = generateNickName;
        io.emit('new-login', { nickname });
      });
    
      socket.on('disconnect', () => {
        // console.log(`usuário ${socket.id} desconectou`);
      });
    });
};

module.exports = {
  parseMessage,
  chat,
};
