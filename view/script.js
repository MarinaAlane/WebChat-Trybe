const socket = io('http://localhost:3000');

const loginForm = document.getElementById('login-user');

loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userInput = document.getElementById('user-input');
  sessionStorage.setItem('user', userInput.value);
  userInput.value = '';
});

const formSendMessage = document.getElementById('send-message');

formSendMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputMessage = document.getElementById('input-message');
  const nickname = sessionStorage.getItem('user');
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => {
  createMessage(message);
});

socket.on('id', ({ id }) => {
  const userId = id.substring(0, 16);
  sessionStorage.setItem('user', userId);
});
