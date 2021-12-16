const messagesModel = require('../models/messages');

const formatNumber = (num) => (num >= 10 ? num : `0${num}`);

const getDateHour = () => {
  const date = new Date();
  const seconds = date.getSeconds();
  const formatSecs = formatNumber(seconds);

  const minutes = date.getMinutes();
  const formatMin = formatNumber(minutes);

  const hour = date.getHours();
  const formatHour = formatNumber(hour);

  const stringTime = `${formatHour}:${formatMin}:${formatSecs}`;

  const formatYear = date.getFullYear();

  const month = date.getMonth() + 1;
  const formatMonth = formatNumber(month);
  
  const day = date.getDate();
  const formatDay = formatNumber(day);
  
  const stringDate = `${formatDay}-${formatMonth}-${formatYear}`;

  const formattedDateHour = `${stringDate} ${stringTime}`; 
  return formattedDateHour;
};

let nicknames = [];

const getMessages = async () => {
  const messages = await messagesModel.getAllMessages();
  return messages;
};

const saveMessages = async (message, nickname) => {
  const timestamp = getDateHour();
  await messagesModel.insertMessage(message, nickname, timestamp);
};

// const sendMessagesToClient = async (io) => {
//   const messages = await getMessages();
//   messages.forEach(({ message, nickname, timestamp }) => {
//     io.emit('message', `${timestamp} - ${nickname} - ${message}`);
//   });
// };

const sendNewMessage = async (message, nickname, io) => {
  const timestamp = getDateHour();
  io.emit('message', `${timestamp} - ${nickname} - ${message}`);
};

const sendMessagesToClient = async (io) => {
  const messages = await getMessages();
  console.log(messages);
  messages.forEach(({ message, nickname, timestamp }) => {
    io.emit('message', `${timestamp} - ${nickname} - ${message}`);
  });
};

const changeNickname = (removedNick, newNick, io) => {
  nicknames = nicknames.filter((nickname) => nickname !== removedNick);
  nicknames.push(newNick);
  io.emit('changeNickname', nicknames);
};

const socketIo = (io) => {
  io.on('connection', (socket) => {
    socket.on('newUser', async (nickname) => {
      nicknames.push(nickname);
      io.emit('newUser', nicknames);
      await sendMessagesToClient(io);
    });
  
    socket.on('disconnect', () => {
      nicknames.splice(nicknames.findIndex((nick) => nick.includes(socket.id)));
      io.emit('disconnected', nicknames);
    });

    socket.on('changeNickname', ({ removedNick, newNick }) => {
      changeNickname(removedNick, newNick, io);
    });

    socket.on('message', async ({ chatMessage, nickname }) => {
      saveMessages(chatMessage, nickname);
      await sendNewMessage(chatMessage, nickname, io);
    });
  });
};

module.exports = socketIo;
