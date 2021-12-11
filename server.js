const express = require('express');

const app = express();
const http = require('http').createServer(app);
const cors = require('cors');
const path = require('path');

const io = require('socket.io')(http, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['POST', 'GET'],
    },
});

const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/template/default')));

app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '/index.html'));
});

require('./socket/Chat')(io);

http.listen(port, () => console.log(`Example app listening on port ${port}!`));
