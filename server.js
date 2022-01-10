const express = require('express');

const moment = require('moment');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

const model = require('./models/chat');

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/chat.html`);
});

const PORT = 3000;
// adiciona lógica socket direto no server
const date = moment(new Date()).format('DD-MM-yyyy h:mm:ss a');
// console.log({ date });

const message = ({ chatMessage, nickname }) =>
  `${date} - ${nickname}: ${chatMessage}`;
let users = [];

io.on('connection', (socket) => {
  console.log(`User ${socket.id} connected`);

  socket.on('updateNickname', (nickname) => {
    console.log({ nickname });
    // io.emit('updateNickname', nickname);
    users = users.filter((client) => client.id !== socket.id); // filtra o id
    users.push({ nickname, id: socket.id }); // empurra pra dentro da lista e atualiza
    io.emit('online', users); // emite para os online
  });

  socket.on('disconnect', () => {
    console.log(`User ${socket.id} disconnected`);
    users = users.filter((client) => client.id !== socket.id); // filtra o id e atualiza a lista de usuãrios
    // https://stackoverflow.com/questions/63168606/socket-io-doesnt-remove-user-object-from-array-after-disconnect
    io.emit('online', users);
  });
});

io.on('connection', async (socket) => {
  const messages = await model.getAll();
  socket.emit('history', messages);
  
  socket.on('message', (data) => {
    model.saveMessage(data);
    io.emit('message', message(data));
  }); 
});

http.listen(PORT, () => console.log(`Servidor ouvindo na porta ${PORT}`)); 