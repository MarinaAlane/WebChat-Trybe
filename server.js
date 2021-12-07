require('dotenv').config();
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

const http = require('http').createServer(app);

const { PORT = 3000 } = process.env;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

require('./sockets/messageSocket')(io);

const rootRouter = require('./routes');

app.use(rootRouter);

http.listen(PORT, () => console.log(`App runnign on port: ${PORT}`));
