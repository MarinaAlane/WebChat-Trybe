const formatDate = (date) => {
  let day = date.toISOString().split('T')[0].split('-');
  day = [day[2], day[1], day[0]].join('-');
  const hour = date.toLocaleTimeString('en-US');
  return `${day} ${hour}`;
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    io.emit('nickname', socket.id);
    socket.on('message', ({ chatMessage, nickname }) => {
      io.emit('message', `${formatDate(new Date(Date.now()))} - ${nickname}: ${chatMessage}`);
    });
  });  
};
