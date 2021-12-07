const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const socketIo = require('socket.io');

app.use('/grupo1', express.static(path.join(__dirname, 'public')));
app.use('/grupo2', express.static(path.join(__dirname, 'public')));

const serve = app.listen(port, () => console.log(`Example app listening on port %s`, port));

const io = socketIo(serve);