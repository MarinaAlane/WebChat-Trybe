const express = require('express');
const path = require('path');
// const moment = require('moment');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    method: ['GET', 'POST'],
  },  
});

require('./socket/chat')(io);

app.use(cors());
app.use(express.static(path.resolve(__dirname, 'public')));

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});

http.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
}); 