const model = require('../models/message');


function generateNickname(n) {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let newNickname = '';
  for (let i = 0; i < n; i += 1) {
    newNickname += chars[Math.floor(Math.random() * chars.length)];
  }
  return newNickname;
}

const userList = [];

const historico = (socket, historic) => {
  socket.emit('newConnection', historic);
  socket.emit('userOnline', userList);
  socket.on('newNickname', (newNickname) => {
    const index = userList.findIndex((list) => list.userID === socket.id);
    if (newNickname.userID === socket.id) userList[index].nickname = newNickname.nickname; 
  });
};

module.exports = (io) => io.on('connection', async (socket) => {
  const historic = await model.getAllMessage()
    .then((e) => e
    .map(({ timestamp, nickname, message }) => `${timestamp} - ${nickname}: ${message}`));

  const usuario = { nickname: generateNickname(16), userID: socket.id };
  userList.push(usuario);

  io.emit('users', usuario);

  historico(socket, historic);
  
  socket.on('users', (user) => io.emit('nickname', user));

  socket.on('message', async ({ chatMessage, nickname }) => {
    const response = await model.createMessage({ chatMessage, nickname });
    io.emit('message', response);    
  });

  socket.on('disconnect', () => {
    const i = userList.findIndex((list) => list.userID === socket.id);
    userList.splice(i, 1);
    io.emit('userOff', socket.id);
  });
});