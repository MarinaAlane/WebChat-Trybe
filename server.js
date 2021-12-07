const express = require('express');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello word');
});

app.listen(3000, console.log(`Escutando a porta ${PORT}`));