const moment = require('moment');

module.exports = (io) => {
  io.on('connection', (socket) => {
    const hashNick = socket.id.substring(0, 16);
    io.emit('connection', hashNick);
    // let newUserNickName;
    socket.on('userEnter', (userName) => {
      // newUserNickName = userName;
      io.emit('userLogin', { userName, hashNick });
    });

    socket.on('message', ({ chatMessage, nickname }) => {
      // https://stackoverflow.com/questions/30158574/how-to-convert-result-from-date-now-to-yyyy-mm-dd-hhmmss-ffff
      // https://momentjs.com/
      const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss A');
      const message = `${date} - ${nickname}: ${chatMessage}`;

      io.emit('message', message);
    });
  });
};