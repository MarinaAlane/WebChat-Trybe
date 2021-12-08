const formatMessage = ({ nickname, chatMessage }) => {
  const date = new Date().toLocaleString().replace(/\//gi, '-');
  return `${date} - ${nickname}: ${chatMessage}`;
};

module.exports = (io) => io.on('connection', (socket) => {
  // console.log(socket.id.slice(0, 16))
  socket.emit('nickname', `${socket.id.slice(0, 16)}`);

  socket.on('message', (message) => {
    // console.log(message, new Date().toLocaleDateString());
    const newMSS = formatMessage(message);
    io.emit('message', newMSS);
  });
});
