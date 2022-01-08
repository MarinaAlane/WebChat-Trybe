const Message = require('../service/message');
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
    io.emit('message', `${fulldate} - ${nickname}: ${chatMessage}`);
    const text = { message: chatMessage, nickname, timestamp: fulldate };
    Message.saveHistory(text);
  });
}

async function getAllhistory(socket) {
  const getMsg = Message.getAll();
  socket.emit('history', getMsg);
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log(`Usuário ${socket.id} conectado`);
  // Marcelo Leite me deu uma dica nessa lógica porque estava comlicando demais essa randomização
  const randonUser = socket.id.slice(0, 16);
  // console.log(randonUser);

  socket.emit('logIn', randonUser);

  socket.on('Nickname', (nickname) => {
    arrayUsers = arrayUsers.filter((user) => user.id !== socket.id);
    arrayUsers.push({ id: socket.id, nickname }); io.emit('userOnline', arrayUsers);
  });

  message(socket, io);
  getAllhistory(socket);

  io.on('disconnect', () => {
    // console.log(`Usuário ${socket.id} desconectado`);
    arrayUsers = arrayUsers.filter((user) => user.id !== socket.id);
    io.emit('userOnline', arrayUsers);
  });
  });
};
