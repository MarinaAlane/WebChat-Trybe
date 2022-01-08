// const Message = require('../models/message');
// a data foi feita através de estudo de como poderia simplificar esse sistema, e encontrei nesse site: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth()).padStart(2, '0');
const year = date.getFullYear();
const hours = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const fulldate = `${day}-${month}-${year} ${hours}`;

let arrayUsers = [];

function message(socket, io) {
  socket.on('message', (msg) => {
    const { nickname, chatMessage } = msg;
    console.log(msg);
    // const text = { message: chatMessage, nickname, timestamp: fulldate };
    // Message.saveHistory(text);
    io.emit('message', `${fulldate} - ${nickname}: ${chatMessage}`);
  });
}

// async function getAllhistory(socket) {
//   const getMsg = Message.getAll();
//   socket.emit('history', getMsg);
// }

module.exports = (io) => {
  io.on('connection', (socket) => {
  // Marcelo Leite me deu uma dica nessa lógica porque estava complicando demais essa randomização
    const randonUser = socket.id.slice(0, 16);
    socket.emit('logIn', randonUser);
    console.log(`Usuário ${randonUser} conectado`);

    socket.on('Nickname', (nickname) => {
    console.log(nickname);
      arrayUsers = arrayUsers.filter((user) => user.id !== socket.id);
      arrayUsers.push({ id: socket.id, nickname }); io.emit('userOnline', arrayUsers);
    });

    // getAllhistory(socket);

    socket.on('disconnect', () => {
      console.log(`Usuário ${randonUser} desconectado`);
      arrayUsers = arrayUsers.filter((user) => user.id !== socket.id);
      io.emit('userOnline', arrayUsers);
    });

    message(socket, io);
  });
};
