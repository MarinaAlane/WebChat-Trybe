const express = require('express');
const cors = require('cors');

const app = express();
const http = require('http').createServer(app);

const PORT = process.env.PORT || 3000;

const io = require('socket.io')(http, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ['GET', 'POST'], 
} });

app.use(express.json());
app.use(cors);

http.listen(PORT, () => {
  console.log(`Ouvindo na porta ${PORT}`);
});