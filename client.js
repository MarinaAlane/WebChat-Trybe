const io = require('socket.io-client');

const client = io.connect('http://localhost:3000', { reconnect: false });

client.on('ping', () => {
  client.emit('pong');
  console.log('ping recebido');
});

client.on('message', console.log);

process.stdin.on('data', (data) => {
  client.emit('message', { chatMessage: data.toString(), nickname: 'jest mctest' });
});
