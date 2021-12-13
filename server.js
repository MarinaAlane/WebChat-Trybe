require('dotenv').config();
const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const cors = require('cors');
const bodyParser = require('body-parser');

// Server config
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

// Socket connection

require('./sockets/webchat')(io); // Chat connection

// Server controllers
const { errorMiddleware } = require('./middlewares');
const routes = require('./routes');

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayouts);

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes.webchat);

app.use(errorMiddleware);

// Server start
require('./bin').startServer(http);
