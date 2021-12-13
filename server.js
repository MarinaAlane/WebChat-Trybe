// Faça seu código aqui
require('dotenv').config();
const app = require('express')();
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server); 

const PORT = 3000;

require('./src/socket/socketChat')(io); 

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

server.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));