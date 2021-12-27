const express = require('express');

const app = express();
const server = require('http').createServer(app);

const PORT = process.env.PORT || 3000;
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`, // url aceita pelo cors
    methods: ['GET', 'POST', 'PUT'], // Métodos aceitos pela url
  },
});

const chatController = require('./controllers/chatController');

app.set('view engine', 'ejs');
app.set('views', './views');

require('./sockets/chat')(io);

app.get('/', chatController);

server.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
