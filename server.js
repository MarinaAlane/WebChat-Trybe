const express = require('express');
const cors = require('cors');
const path = require('path');
const moment = require('moment');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', (_req, res) => {
  res.render('index.html');
});

const PORT = process.env.PORT || 3000;

const messages = [];

io.on('connection', (socket) => {
  socket.emit('previusMessages', messages);

  socket.on('message', (message) => {
    messages.push(message);

    const time = moment().format('DD-MM-YYYY hh:mm:ss A');
    const formatedMessage = `${time} - ${message.nickname}: ${message.chatMessage}`;

    io.emit('message', formatedMessage);
  });
});

server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});

module.exports = {
  io,
  moment,
};
