const express = require('express');
const app = express();

const http = require('http').createServer(app);

app.use(express.static(`${__dirname}/public`));

const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: 'GET, POST',
    // allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    // credentials: true,
  },
});

require('./server/socket')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
