// Faça seu código aqui
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
// criando um servidor a partir de http
const server = require('http').createServer(app);
// Configurando io já com cors habilitado
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const publicPath = path.join(__dirname, '/public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.use(cors);

require('./sockets/chat')(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`listening on port ${PORT}`));

console.log('-->', publicPath);
