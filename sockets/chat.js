function NOW() {
  const date = new Date();
  const yyyy = date.getUTCFullYear();
  let dd = date.getUTCDate();
  let mm = (date.getUTCMonth() + 1);

  if (dd < 10) {
    dd = `0${dd}`;
  }

  if (mm < 10) {
    mm = `0${mm}`;
  }
  const currentDay = `${dd}-${mm}-${yyyy}`;

  let hours = date.getUTCHours();
  let minutes = date.getUTCMinutes();
  let seconds = date.getUTCSeconds();

  if (hours < 10) {
    hours = `0${hours}`;
  }

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${currentDay} ${hours}:${minutes}:${seconds}`;
}

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('message', (payload) => {
    console.log(`Mensagem ${payload.chatMessage}`);
    
    const timestamp = NOW();
    console.log(timestamp);

    const chatMessage = `${timestamp} - ${payload.nickname}: ${payload.chatMessage}`;
    io.emit('message', chatMessage);
  });
});