const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.status(200).json('Funfou');
});

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});