const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const messagesRouter = require('./routes');

const PORT = process.env.PORT || 3000;

require('./sockets')(io);

app.use(cors());
app.use(express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use('/', messagesRouter);

server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});