require('dotenv').config();
const express = require('express');

const app = express();
// set the view engine to ejs - REF: https://www.digitalocean.com/community/tutorials/how-to-use-ejs-to-template-your-node-application-pt
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));
const http = require('http').createServer(app);

const PORT = 3000 || process.env.PORT;
const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'],
  },
});
require('./sockets/message')(io);
require('./sockets/user')(io);

const route2Root = require('./routes');

app.use(route2Root);
http.listen(PORT, () => console.log(`${PORT}`));
