const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

const webchat = require('./sockets/chat');

webchat(io);

app.use(cors());
app.use(express.static(path.join(__dirname, '/public')));
app.set('views', './views');
app.set('view engine', 'ejs');

// Render WebChat
app.get('/', (_req, res) => {
  res.render('index');
});

server.listen(PORT, () => console.log(`Tá on na porta ${PORT} !!`)); 

// Ref: meu antigo projeto: https://github.com/tryber/sd-010-a-project-webchat/pull/89/files
// Tirei os sockets do arquivo, mais organizado
