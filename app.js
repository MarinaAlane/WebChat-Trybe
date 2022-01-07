const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
  cors: '*',
  methods: ['GET', 'POST'],
});
// run all sockets listeners
require('./socketio')(io);

const cors = require('cors');
const path = require('path')

const nextErrors = require('./errors/nextErrors');
const { webchatRoutes } = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
// path pra databank com fs
// app.use(express.static(path.join(__dirname, 'databank')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/webchat', webchatRoutes);

app.get('/', (_req, res) => res.redirect('/webchat'));

app.use(nextErrors);

module.exports = server;