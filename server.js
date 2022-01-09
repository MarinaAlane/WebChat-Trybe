const express = require('express');

const app = express();
const http = require('http').createServer(app); // servidor HTTP

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});
// Sempre que um cliente se conectar ao servidor executa essa função
io.on('connection', (socket) => {
  console.log(`Usuário conectado. ID: ${socket.id} `);
});

app.use(express.static(`${__dirname}/public`));
  
app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});