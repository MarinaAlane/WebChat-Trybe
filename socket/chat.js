const moment = require('moment');

const zoeirosOnline = [];

const createZoeiro = (socket) => {
  const { id } = socket;
  const idDaZoeira = id.substr(0, 16);

  zoeirosOnline.push({ id, nickname: idDaZoeira });

  socket.emit('newUser', idDaZoeira);
};

const newZoeira = (socket, io) => {
  const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');

  socket.on('message', ({ nickname, chatMessage }) => {
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });
};

const setNewZoeiro = (socket, io) => {
  socket.on('saveZoeiro', (newNick) => {
    const userIndex = zoeirosOnline.findIndex((user) => user.id === socket.id);

    zoeirosOnline[userIndex].nickname = newNick;

    io.emit('usersOnline', zoeirosOnline);
  });
};

const updateZoeiroOnline = (socket, io) => {
  socket.on('usersOnline', () => {
    io.emit('usersOnline', zoeirosOnline);
  });
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    newZoeira(socket, io);
    createZoeiro(socket);
    setNewZoeiro(socket, io);
    updateZoeiroOnline(socket, io);
  });
};