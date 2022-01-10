// Faça seu código aqui
const express = require('express');
const path = require('path');
const CORS = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const PORT = process.env.PORT || 3000;

require('./sockets')(io);

app.use(CORS());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use('/', (req, res) => {
  res.render('index.ejs');
});

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});