const Message = require('../controllers/messages');
// a data foi feita através de estudo de como poderia simplificar esse sistema, e encontrei nesse site: https://www.horadecodar.com.br/2021/04/03/como-pegar-a-data-atual-com-javascript/
const date = new Date();
const day = String(date.getDate()).padStart(2, '0');
const month = String(date.getMonth()).padStart(2, '0');
const year = date.getFullYear();
const hours = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
const timestamp = `${day}-${month}-${year} ${hours}`;

let arrayUsers = [];

async function history(socket) {
  const getMsg = await Message.getAll();
  socket.emit('history', getMsg);
}

module.exports = (io) => {
  io.on('connection', (socket) => {
    // Marcelo Leite me deu uma dica nessa lógica porque estava comlicando demais essa randomização
    const randonUser = socket.id.slice(0, 16);
    console.log(`Usuário ${randonUser} conectado`);

  socket.emit('logIn', randonUser);

  socket.on('userOnline', (nickname) => {
    arrayUsers.push({ id: randonUser, nickname }); io.emit('userOnline', arrayUsers);
    arrayUsers = arrayUsers.filter((user) => user.id !== socket.id);
    history(socket);
  });

  socket.on('message', (msg) => {
    const { nickname, chatMessage } = msg;
    io.emit('message', `${timestamp} - ${nickname}: ${chatMessage}`);
    const text = { message: chatMessage, nickname, timestamp };
    Message.saveHistory(text);
  });
  
  io.on('disconnect', () => {
    arrayUsers = arrayUsers.filter((user) => user.id === socket.id);
    console.log(`Usuário ${randonUser} desconectado`);
    io.emit('userOnline', arrayUsers);
  });
  });
};
