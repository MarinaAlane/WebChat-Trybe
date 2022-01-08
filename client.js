const socket = window.io();

const form = document.getElementById('messageForm');
const inputMessage = document.getElementById('messageInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: socket.id,
    chatMessage: inputMessage.value,
  });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));