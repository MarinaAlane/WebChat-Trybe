const express = require('express');
const path = require('path');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});
const { getMessages } = require('./models/messages');

require('./socket')(io);

app.use(express.static(path.join(__dirname, 'public')));

app.set('view-engine', 'ejs');
app.set('views', path.join(__dirname, 'public'));

app.get('/', async (_req, res) => {
  const messages = await getMessages();
  return res.render('./index.ejs', { messages });
});

const port = 3000;
http.listen(port, () => console.log(`listening on port ${port}!`));
