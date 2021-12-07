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

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (payload) => {
    console.log(`Mensagem ${payload.chatMessage}`);
    
    const timestamp = nowTime();
    console.log(timestamp);

    const chatMessage = `${timestamp} - ${payload.nickname}: ${payload.chatMessage}`;
    io.emit('message', chatMessage);
  });
});