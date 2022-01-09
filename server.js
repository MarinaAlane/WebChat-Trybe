const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

require('./sockets')(io);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);

app.set('view engine', 'ejs');

app.use('/', require('./routes/messagesRouter'));

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`listening at ${PORT}`);
});
