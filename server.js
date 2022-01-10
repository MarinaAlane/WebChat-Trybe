const express = require('express');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.static(`${__dirname}/public`));

require('./sockets/chat')(io);

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', (_req, res) => res.render('webchat'));

server.listen(3000, () => console.log('Servidor na porta: 3000'));
