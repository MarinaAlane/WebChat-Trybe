const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET'],
  },
});
const { getAll } = require('./models/messageModel');

app.set('view engine', 'ejs');
app.set('views', './views');

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', async (_req, res) => {
  const allMessages = await getAll();
  res.status(200).render('index', { messages: allMessages });
});

require('./sockets')(io);

http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));