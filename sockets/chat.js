function nowTime() {
  let today = new Date();

  let hours = today.getUTCHours();
  let minutes = today.getUTCMinutes();
  let seconds = today.getUTCSeconds();

  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yyyy = today.getFullYear();

  today = `${mm}-${dd}-${yyyy}`;

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${today} ${hours}:${minutes}:${seconds}`;
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