const PORT = process.env.PORT || 3000;

const socketIO = require('socket.io');
const http = require('http');

const app = require('./app');

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
} });

require('./sockets/chat')(io);

server.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});