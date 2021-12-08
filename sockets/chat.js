const formatMessage = ({ nickname, chatMessage }) => {
  const date = new Date().toLocaleString().replace(/\//gi, '-');
  return `${date} - ${nickname}: ${chatMessage}`;
};

module.exports = (io) => io.on('connection', (socket) => {
  io.on('connection', (user) => {
    socket.emit('nickname', `${user.id}`);
  });

  socket.on('message', (message) => {
    console.log(message, new Date().toLocaleDateString());
    const newMSS = formatMessage(message);
    io.emit('message', newMSS);
  });
});
