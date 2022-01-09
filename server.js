const cors = require('cors');
const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());

app.use('/css', express.static(`${__dirname}/views/css`));
app.use('/js', express.static(`${__dirname}/views/js`));

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

require('./sockets/chat')(io);
const { getUsers } = require('./utils/chat');
const { getMessages } = require('./models/messages');

app.get('/', async (_req, res) => {
  const messages = await getMessages();
  const users = getUsers();
  res.status(200).render('index', { messages, users });
});

const PORT = process.env.PORT || 3000;

http.listen(PORT, () => {
  console.log(`Escutando na porta ${PORT}...`);
});
