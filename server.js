require('dotenv').config();
const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const { PORT = 3000 } = process.env;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});

app.use(express.static(`${__dirname}/public`));

require('./chat.js')(io);
require('./users.js')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/chat.html`);
});

http.listen(PORT, () => console.log(`Server is running on port: ${PORT}`)); 
