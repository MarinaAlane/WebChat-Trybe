const express = require('express');
const http = require('http');
const path = require('path');

const app = express();
const PORT = 3000;
const server = http.createServer(app);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

server.listen(PORT, () => console.log(`Funicionando na porta ${PORT}`));
