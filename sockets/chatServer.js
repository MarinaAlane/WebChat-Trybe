const moment = require('moment');
const msgControllers = require('../controllers/messageControllers');

const nickUsers = [];

const updateUserNickname = (socket, io) => {
  socket.on('updateNickname', (newNick) => {
    const findUser = nickUsers.findIndex((user) => user.id === socket.id);
    nickUsers[findUser].nickname = newNick;
    io.emit('userLogged', nickUsers);
    // console.log(nickUsers, 'UPDATENICK');
  });
};

const userDisconnect = (socket) => {
  socket.on('disconnect', () => {
    const disconnectUser = nickUsers.find((user) => user.id === socket.id);
    nickUsers.splice(nickUsers.indexOf(disconnectUser), 1);
   // console.log(`${socket.id} desconectou`);
    socket.broadcast.emit('userLogged', nickUsers);
  });
};

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userLogged', async (nickname) => {
    nickUsers.push({ nickname, id: socket.id });
    io.emit('userLogged', nickUsers);
    const msgHistory = await msgControllers.getAllMessages();
   // console.log(msgHistory, 'MSGHISTORY');
    socket.emit('historyMessages', msgHistory);
    // console.log(nickUsers.length, 'PUSH-USERLOGGED');
  });
  socket.on('message', async ({ chatMessage, nickname }) => {
    const timestamp = moment().format('MM-DD-YYYY h:mm:ss');
    await msgControllers.saveMessages({ timestamp, chatMessage, nickname });
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
  });  
  updateUserNickname(socket, io);
  userDisconnect(socket);
});

/*
Obter e mostrar data e hora sites pesquisados:
https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/#:~:text=Para%20obter%20a%20data%20(e,uma%20vari%C3%A1vel%20var%20dia%20%3D%20data.

https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
*/
