const { createMessage, getAllMessages } = require('../models/messageModel');

function nowTime() {
  let today = new Date();

  const hours = String(today.getUTCHours()).padStart(2, '0');
  const minutes = String(today.getUTCMinutes()).padStart(2, '0');
  const seconds = String(today.getUTCSeconds()).padStart(2, '0');

  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${mm}-${dd}-${yyyy} ${hours}:${minutes}:${seconds}`;
  return today;
}

function formatMessage(timestamp, nickname, message){
  return `${timestamp} - ${nickname}: ${message}`;
}

const allConnectedUsers = [];

module.exports = (io) => io.on('connection', async (socket) => {
  console.log(`user ${socket.id} connected!!`);
  const allMessages = await getAllMessages();
  const formatedMessages = allMessages.map((document) => formatMessage(document.timestamp, document.nickname, document.message));
  socket.emit('allMessages', formatedMessages);

  // todo evento "message" vindo do browser
  socket.on('message', async (payload) => {
    console.log(`Mensagem ${payload.chatMessage}`);
    
    const timestamp = nowTime();
    console.log(timestamp);

    // salva no banco de dados e aguarda
    await createMessage(payload.chatMessage, payload.nickname, timestamp);
    
    // gera a string formatada
    const chatMessage = formatMessage(timestamp, payload.nickname, payload.chatMessage);
    io.emit('message', chatMessage);
  });
  socket.on('newUserConnected', (nickname) => {
    const id = socket.id;
    let obj = { 
      id,
      nickname
    }
    allConnectedUsers.push(obj);
    const allConnectedUsersNickname = allConnectedUsers.map((userObject) => {
      return userObject.nickname
    })
    io.emit('allUsers', allConnectedUsersNickname);
  });
  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconected.`);
    let indexToBeDeleted = allConnectedUsers.findIndex((currentItem) => {
      return currentItem.id === socket.id;
    });
    console.log('AQUI TÁ O INDEX', indexToBeDeleted)
    allConnectedUsers.splice(indexToBeDeleted, 1);
    const allConnectedUsersNickname = allConnectedUsers.map((userObject) => {
      return userObject.nickname
    })
    io.emit('allUsers', allConnectedUsersNickname);
  });
});