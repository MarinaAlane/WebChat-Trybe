const express = require('express');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  } });

const publicPath = `${__dirname}/public`;

app.use(express.static(publicPath));

require('./sockets/chat')(io);

app.get('/', (req, res) => {
  /* Correções sugeridas pelo eslint:
  Concatenação de string: https://eslint.org/docs/rules/no-path-concat
  Template literals: https://eslint.org/docs/rules/prefer-template
  */
  const fullPath = `${__dirname}/server.html`;
  res.sendFile(fullPath);
});

http.listen(PORT, () => {
  console.log(`Servidor ouvindo na porta ${PORT}`);
});
