// ..source: https://socket.io/get-started/chat

const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.get('/', (_req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
