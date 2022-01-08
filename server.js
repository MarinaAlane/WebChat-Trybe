const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  }, 
});

require('./socket')(io);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => console.log(`Escutando na porta ${PORT}`));
