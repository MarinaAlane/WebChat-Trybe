const express = require('express');
const path = require('path');
const CORS = require('cors');
const moment = require('moment');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

app.use(CORS());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.html');
});

const messages = [];

io.on('connection', (socket) => {
  socket.emit('previousMessages', messages);

  socket.on('message', (message) => {
    messages.push(message);
    const time = moment().format('DD-MM-YYYY hh:mm:ss A');
    const formatedMessage = `${time} - ${message.nickname}: ${message.chatMessage}`;
    io.emit('message', formatedMessage);
  });
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = {
  io,
  moment,
};
