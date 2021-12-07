require('dotenv').config();
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/', (_request, response) => response.render('pages/index'));

const http = require('http').createServer(app);

const { PORT = 3000 } = process.env;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log(`New user connected. ID: ${socket.id}`);
});

http.listen(PORT, () => console.log(`App runnign on port: ${PORT}`));
