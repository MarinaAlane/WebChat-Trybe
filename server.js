const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/public`));

require('./sockets/main')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/main.html`);
});

http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
