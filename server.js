const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

const PORT = 3000;
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.json());

require('./sockets/socketChat')(io);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use('/', (req, res) => {
  res.render('index.ejs');
});

server.listen(PORT, () => {
  console.log(`Server started on http//:localhost:${PORT}`);
});
