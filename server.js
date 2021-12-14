const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: { 
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
  },
});

io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
