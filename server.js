require('dotenv').config();
const socketio = require('socket.io');
const http = require('http');
const { app } = require('./app');

const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is up on port ${PORT}`);
});
