const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', './views');

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['POST', 'GET'],
  },
});

const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get('/', (_req, res) => {
  res.status(200).render('index', { authors: [{ name: 'Leo' }, { name: 'Marcos' }] });
});

require('./sockets')(io);

http.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));