const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    const hashNick = Math.random().toString(11).slice(2);
    io.emit('connection', hashNick);
    // let newUserNickName;
    socket.on('userEnter', (userName) => {
      // newUserNickName = userName;
      io.emit('userLogin', userName);
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      console.log(chatMessage);
      // https://stackoverflow.com/questions/30158574/how-to-convert-result-from-date-now-to-yyyy-mm-dd-hhmmss-ffff
      // https://momentjs.com/
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
      const message = `${date} - ${nickname}: ${chatMessage}`;

      io.emit('message', message);
    });
  });
};