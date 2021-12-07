// Faça seu código aqui
const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.static(`${__dirname}/views`));

http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});