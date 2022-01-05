const express = require('express');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const path = require('path');
const cors = require('cors');

require('./sockets/chat')(io);

app.use(express.static('views'));
app.use(cors());
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.get('/', (_, res) => {
    res.render('chat');
});

server.listen(3000);
