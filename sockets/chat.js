const allUsers = [];

// https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript

const formatTimestamp = () => {
  const date = new Date();
  const dateFormat = [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('-');
  const hourFormat = [date.getHours(), date.getMinutes(), date.getSeconds()].join(':');

  return { dateFormat, hourFormat };
};

module.exports = (io) => io.on('connection', (socket) => {
  let userName = socket.id.substring(0, 16);
  allUsers.push(userName);

  socket.emit('saveNick', userName);
  io.emit('user', allUsers);

  socket.on('userNick', (user) => {
    allUsers.splice(allUsers.indexOf(userName), 1, user);
    userName = user;
    io.emit('user', allUsers);
  });

  socket.on('disconnect', () => {
    allUsers.splice(allUsers.indexOf(userName), 1);
    io.emit('user', allUsers);
  });

  socket.on('message', (message) => {
    const { dateFormat, hourFormat } = formatTimestamp();
    io.emit('message', `${dateFormat} ${hourFormat} - ${userName}: ${message.chatMessage}`);
  });
});