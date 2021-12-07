const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const messagesController = require('./controllers/messagesController');

require('./sockets/chat')(io);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.set('view engine', 'ejs');
app.set('views', './views');

app.get('/', messagesController.getMessage);

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});