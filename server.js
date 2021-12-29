require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

const server = require('http').createServer(app);

const urlOrigin = `http://localhost:${PORT}`;

const socket = require('socket.io')(server, {

  cors: {

    methods: ['GET', 'POST'],
    
    origin: urlOrigin,

  },

});

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
})

require('./sockets/chat')(socket);

server.listen(PORT, () => {
  console.log(`Porta ${PORT}`);
});