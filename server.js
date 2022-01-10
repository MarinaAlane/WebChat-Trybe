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

app.get('/', async (_req, res) => {
  const messages = await messagesModel.getAll();

  // const messages = [
  //   {
  //     message: 'Cheguei, galera',
  //     nickname: 'xablau',
  //   },
  //   {
  //     message: 'Fala aew, blz ?',
  //     nickname: 'becauro',
  //   }];

  res.render('chat', { messages });
});

app.post('/', async (req, res) => {
  const { nickname, message } = req.body;

  try {
    await messagesModel.create({ nickname, message });
    res.status(201).send('Insertion successfully');
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/ping', (_req, res) => res.send('PONG!'));

http.listen(PORT, () => console.log(`Running Wechat in ${PORT} port`));