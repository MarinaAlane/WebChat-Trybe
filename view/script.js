const socket = io('http://localhost:3000');

const formSendMessage = document.getElementById('send-message');

formSendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputMessage = document.getElementById('input-message');
  socket.emit('message', { message: inputMessage.value });
});
