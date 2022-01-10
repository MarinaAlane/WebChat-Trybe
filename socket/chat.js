const moment = require('moment');
const chatModel = require('../models/chatModel');

const zoeirosOnline = [];

const createZoeiro = (socket) => {
  const { id } = socket;
  const idDaZoeira = id.substr(0, 16);

  zoeirosOnline.push({ id, zoeiro: idDaZoeira });

  socket.emit('newZoeiro', idDaZoeira);
};

const newZoeira = (socket, io) => {
  const timestamp = moment().format('DD-MM-YYYY h:mm:ss A');

  socket.on('zoeira', async ({ zoeiro, zoeira }) => {
    io.emit('zoeira', `${timestamp} - ${zoeiro}: ${zoeira}`);

    await chatModel.createZoeiras({
      message: zoeira,
      nickname: zoeiro,
      timestamp,
    });
  });
};

const setNewZoeiro = (socket, io) => {
  socket.on('saveZoeiro', (newNameZoeiro) => {
    const userIndex = zoeirosOnline.findIndex((zoeiro) => zoeiro.id === socket.id);

    zoeirosOnline[userIndex].zoeiro = newNameZoeiro;

    io.emit('zoeirosOnline', zoeirosOnline);
  });
};

const updateZoeiroOnline = (socket, io) => {
  socket.on('zoeirosOnline', () => {
    io.emit('zoeirosOnline', zoeirosOnline);
  });
};

const getZoeiras = async (socket) => {
  const zoeiras = await chatModel.getAllZoeiras();

  socket.emit('getZoeiras', zoeiras);
};

module.exports = (io) => {
  io.on('connection', (socket) => {
    newZoeira(socket, io);
    createZoeiro(socket);
    setNewZoeiro(socket, io);
    updateZoeiroOnline(socket, io);
    getZoeiras(socket);
  });
};