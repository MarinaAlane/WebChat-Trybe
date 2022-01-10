const express = require('express');
const http = require('http');

const app = express();
const PORT = 3000;
const server = http.createServer(app);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'teste' });
});

server.listen(PORT, () => console.log(`Estamos online na ${PORT}`));
