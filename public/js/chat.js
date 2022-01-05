const socket = window.io();

const formMessage = document.getElementById('form-messages');
const inputMessage = document.getElementById('messageInput');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('clientMessage', inputMessage.value);
  inputMessage.value = ''; 
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('serverMessage', (message) => createMessage(message));
