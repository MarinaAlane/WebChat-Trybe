const socket = window.io();

const messageForm = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');
const nicknameForm = document.querySelector('#nickname');
const nicknameInput = document.querySelector('#name-input');
const name = document.querySelector('#name');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(messageInput.value);
  socket.emit('message', { chatMessage: messageInput.value, nickname: name.innerText });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  name.innerText = nicknameInput.value;
  nicknameInput.value = '';
});

const userName = () => {
  socket.emit('nickname');
  socket.on('nickname', (id) => {
    name.innerText = id.slice(-16);
  });
};

userName();

socket.on('message', (message) => {
  const chat = document.querySelector('#message-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  chat.appendChild(li);
});
