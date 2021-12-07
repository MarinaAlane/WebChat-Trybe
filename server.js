const express = require('express');

const PORT = 3000;
const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000/', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  },
});

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.listen(PORT, () => {
  console.log(`Server started on http//:localhost:${PORT}`);
});
