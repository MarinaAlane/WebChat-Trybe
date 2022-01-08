// Retirado dos ensinamentos de Socket.io na Trybe.
const express = require('express');
const CORS = require('cors');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const router = require('./routes');

const PORT = process.env.PORT || 3000;

require('./sockets')(io);

app.use(CORS());
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use('/', router);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
