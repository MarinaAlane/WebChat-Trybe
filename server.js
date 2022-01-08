const express = require('express');

const app = express();
const http = require('http').createServer(app);

app.set('views', './views');
app.set('view engine', 'ejs');
const io = require('socket.io')(http, {
  
  cors: {
    origin: 'http://localhost:3000', // url aceita pelo cors
    methods: ['GET', 'POST'], // Métodos aceitos pela url
  } });

   require('./sockets/chat.js')(io);

   app.use(express.static(`${__dirname}/public`));
   
  //  app.get('/', (req, res) => {
  //   res.sendFile(`${__dirname}/public/chat.html`);
  // });

  const controller = require('./public/controller/chatContoller');

    app.get('/', controller.getMessages);
//   app.post('/', controller.createMessages);
http.listen(3000, () => {
  console.log('Servidor ouvindo na porta 3000');
});
