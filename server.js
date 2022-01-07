const express = require('express');
const path = require('path');
// const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const http = require('http').createServer(app);
// const io = new Server(server);

const io = require('socket.io')(http, {
    cors: {
      origin: 'http://localhost:3000', // url aceita pelo cors
      methods: ['GET', 'POST'], // Métodos aceitos pela url
    } });
  
  io.on('connection', (socket) => {
    console.log(`Usuário conectado. ID: ${socket.id} `);
    io.on('disconnect', () => {
        console.log(`Usuário desconectado. ID: ${socket.id} `);
    });
  });

app.get('/', (_req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 3000;
http.listen(PORT, () => console.log(`rodando na porta ${PORT}`));
