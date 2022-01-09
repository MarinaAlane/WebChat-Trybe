const express = require('express');

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'], 
  },
});
require('./sockets/socket')(io);
const chatController = require('./controllers/chatController');

app.use(express.static(`${__dirname}/view`));
app.set('view engine', 'ejs');
app.set('views', './view');
app.get('/', chatController.getMessage);
http.listen(3000, () => console.log('App started on port 3000'));