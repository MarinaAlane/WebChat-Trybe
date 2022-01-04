require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const PORT = process.env.PORT || 3000;

// ..Source: https://socket.io/docs/v4/handling-cors/
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/views`));

// ..Source: https://app.betrybe.com/course/back-end/sockets/sockets-socketio/7eba74a2-260a-4a4d-954e-14d8cc7a9d92/conteudo/8be008a0-ad01-4db8-b58e-965207fd3e30/refatorando/59793ec2-4156-46e5-a9ba-6892523e44cc?use_case=side_bar
require('./sockets/chat.js')(io);
require('./sockets/users.js')(io);

// ..Source: https://socket.io/get-started/chat
app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/views/chat.html`);
});

http.listen(PORT, () => console.log(`Server started on ${PORT}`));
