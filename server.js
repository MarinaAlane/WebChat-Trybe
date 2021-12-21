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

// const messageController = require('./controller/message');

app.get('/', (_req, res) => {
// app.get('/', async (_req, res) => {
  // const allMessages = await messageController.getAllMessages();
  // ..source: https://github.com/tryber/sd-011-live-lectures/blob/lecture/30.3/index.js
  // res.render(`${__dirname}/views`, { allMessages });
  res.render(`${__dirname}/views`);
});

require('./socket/user')(io);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
