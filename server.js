const express = require('express');
const app = express();
const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
});

http.listen(3000, () => {
  console.log('Servidor on na porta 3000');
});
