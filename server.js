const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Conectado');
});

const PORT = 3000;

app.listen(PORT, () => console.log(`conectado na porta ${PORT}`));