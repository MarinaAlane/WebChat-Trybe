// Faça seu código aqui

const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/',
    methods: ['GET', 'POST'],
  },
});
const messagesModel = require('./models/messagesModel');

app.set('view engine', 'ejs');

app.set('views', './views');

app.use(express.static(`${__dirname}/frontend`));

const PORT = 3000;

app.use(cors());

require('./backend/socket')(io);

app.get('/', (_req, res) => {
  res.render('chat');
});

app.get('/messages', async (_req, res) => { 
  const messages = await messagesModel.getAll();

  res.status(200).render('chat', { messages });
});

app.get('/ping', (_req, res) => res.send('PONG!'));

http.listen(PORT, () => console.log(`Running Wechat in ${PORT} port`));