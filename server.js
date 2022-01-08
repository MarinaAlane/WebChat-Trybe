// Faça seu código 
const express = require('express');

const path = require('path');
const cors = require('cors');

const PORT = 3000;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },
});

app.use(cors());
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

http.listen(PORT, () => console.log(`Ouvindo a aplicação na porta: ${PORT}`));
