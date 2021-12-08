const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const nicknameInput = document.getElementById('nicknameInput');
const nicknameSubmitButton = document.getElementById('nickButton');
const onlineUser = document.getElementById('onlineUser');

nicknameSubmitButton.addEventListener('click', () => {
  sessionStorage.setItem(socket.id, nicknameInput.value);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, 
    nickname: sessionStorage.getItem(socket.id) || socket.id });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('messageServer', (message) => createMessage(message));

socket.on('messageServer', () => {
  onlineUser.innerText = 'CoCoNuTsTrSaWsOn';
});

socket.on('message', (message) => {
  createMessage(message);
});