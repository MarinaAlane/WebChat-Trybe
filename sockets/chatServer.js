const moment = require('moment');
/* refatorado usando moment() - https://momentjs.com/ */
const curretTime = moment().format('MM-DD-YYYY h:mm:ss');

const nickUsers = [];

module.exports = (io) => io.on('connection', (socket) => {
  socket.on('userLogged', (nickname) => {
    nickUsers.push({ nickname, id: socket.id });
    io.emit('userLogged', nickUsers);
    // console.log(nickUsers.length, 'PUSH-USERLOGGED');
  });
  socket.on('updateNickname', (newNick) => {
    const findUser = nickUsers.findIndex((user) => user.id === socket.id);
    nickUsers[findUser].nickname = newNick;
    io.emit('userLogged', nickUsers);
   // console.log(nickUsers, 'UPDATENICK');
  });
  socket.on('message', ({ chatMessage, nickname }) => {
    io.emit('message', `${curretTime} - ${nickname}: ${chatMessage}`);
  });
  socket.on('disconnect', () => {
    const disconnectUser = nickUsers.find((user) => user.id === socket.id);
    nickUsers.splice(nickUsers.indexOf(disconnectUser), 1);
    console.log(`${socket.id} desconectou`);
    socket.broadcast.emit('userLogged', nickUsers);
  });
});

/* 
Obter e mostrar data e hora sites pesquisados:
https://codare.aurelio.net/2009/04/03/javascript-obter-e-mostrar-data-e-hora/#:~:text=Para%20obter%20a%20data%20(e,uma%20vari%C3%A1vel%20var%20dia%20%3D%20data. 

https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Date

https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
*/
