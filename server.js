const app = require('express')();
const http = require('http').createServer(app);

const cors = require('cors');

const io = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:3000',
    method: ['GET', 'POST'],
  },
});

const chatController = require('./controllers/chatController');

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(cors());

io.on('connection', (socket) => {
  console.log(`O Usuário ${socket.id} entrou no chat`);
});

app.get('/', chatController.getHistoryMessages);
  
http.listen(3000, () => console.log('listening on port 3001'));