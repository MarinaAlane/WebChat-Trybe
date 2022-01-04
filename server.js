// ..source: https://socket.io/get-started/chat
require('dotenv').config();

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

require('./socket/chat')(io);
require('./socket/user')(io);

// ..source: https://github.com/tryber/sd-011-live-lectures/blob/lecture/30.3/index.js
app.get('/', (_req, res) => {
  res.render(`${__dirname}/views`);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
