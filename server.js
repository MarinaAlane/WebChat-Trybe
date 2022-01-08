const express = require('express');
const moment = require('moment');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});
const userRoutes = require('./routes/user.routes');

app.use(express.urlencoded({ extended: true }));
app.use('/', userRoutes);
app.set('view engine', 'ejs');
app.set('views', './views');

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
  
  socket.on('message', ({ nickname, chatMessage }) => {
    const currentDate = moment().format('DD-MM-YYYY HH:MM:ss A');
    const changeNickName = nickname || socket.id;
    io.emit('message', `${currentDate} ${changeNickName}: ${chatMessage}`);
  });
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
