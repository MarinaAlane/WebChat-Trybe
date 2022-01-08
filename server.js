 const express = require('express');
 const cors = require('cors'); 

 const app = express();
 const http = require('http').createServer(app);
 const path = require('path');

 const PORT = 3000;

 const io = require('socket.io')(http, {
   cors: {
     origin: 'http://localhost:3000', // url aceita pelo cors
     methods: ['GET', 'POST'], // Métodos aceitos pela url
   },
 });

 require('./socket')(io); 

 app.use(cors()); 

 app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
  }); 

 http.listen(PORT, () => {
   console.log(`Servidor ouvindo na porta ${PORT}`);
});