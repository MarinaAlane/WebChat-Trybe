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

function formatMessage(timestamp, nickname, message) {
  return `${timestamp} - ${nickname}: ${message}`;
}

const allConnectedUsers = [];

function sendAllUsers(io) {
  const allConnectedUsersNickname = allConnectedUsers.map((userObject) => userObject.nickname);
  io.emit('allUsers', allConnectedUsersNickname);
}

async function handleMessage(io, payload) {
  const timestamp = nowTime();
  await createMessage(payload.chatMessage, payload.nickname, timestamp);
  const chatMessage = formatMessage(timestamp, payload.nickname, payload.chatMessage);
  io.emit('message', chatMessage);
}

function handleNewUser(io, socket, nickname) {
  const { id } = socket;
  const obj = { id, nickname };
  allConnectedUsers.push(obj);
  sendAllUsers(io);
}

function handleDisconnection(io, socket) {
  const indexToBeDeleted = allConnectedUsers
    .findIndex((currentItem) => currentItem.id === socket.id);

  console.log('removing index:', indexToBeDeleted);

  if (indexToBeDeleted === -1) {
    console.log('Socket did not start yet!');
    sendAllUsers(io);
    return;
  }

  allConnectedUsers.splice(indexToBeDeleted, 1);
  sendAllUsers(io);
}

function handleNewNickname(io, socket, newNickname) {
  const indexToBeEdited = allConnectedUsers
    .findIndex((currentItem) => currentItem.id === socket.id);
  
  console.log('updating index:', indexToBeEdited);
  if (indexToBeEdited === -1) {
    console.log('ERROR!!!!');
    return;
  }

  const currentNickname = allConnectedUsers[indexToBeEdited].nickname;
  console.log('trocando nick de', currentNickname, 'para', newNickname);
  
  allConnectedUsers[indexToBeEdited].nickname = newNickname;
  sendAllUsers(io);
}

const startingConnection = (io) => {
    io.on('connection', async (socket) => {
      const allMessages = await getAllMessages();
      const formatedMessages = allMessages
        .map((document) => formatMessage(document.timestamp, document.nickname, document.message));
      socket.emit('allMessages', formatedMessages);

      socket.on('message', async (payload) => {
        handleMessage(io, payload);
      });

      socket.on('newUserConnected', (nickname) => {
        handleNewUser(io, socket, nickname);
      });

      socket.on('disconnect', () => {
        handleDisconnection(io, socket);
      });

      socket.on('newNickname', (newNickname) => {
        handleNewNickname(io, socket, newNickname);
      });
    });
};

module.exports = startingConnection;
