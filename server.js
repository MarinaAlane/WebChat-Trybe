const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.use(express.json());

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 3000;
// const NOW = new Date();

app.use(express.static(`${__dirname}/public`));

// const dateAndTime = (date) => {
//   const day = String(date.getDate()).padStart(2, '0');
//   const month = String(date.getMonth() + 1).padStart(2, '0');
//   const year = date.getFullYear();
//   const hour = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   const ampm = hour >= 12 ? 'PM' : 'AM';

//   return `${day}-${month}-${year} ${hour}:${minutes}:${seconds} ${ampm}`;
// };

require('./sockets/main')(io);

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/main.html`);
});

http.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
