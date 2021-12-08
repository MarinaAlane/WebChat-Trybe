const socket = window.io();

const messageForm = document.getElementById('message-form');
const inputMessage = document.getElementById('message-input');

const nicknameForm = document.getElementById('nickname-form');
const inputNickname = document.getElementById('nickname-input');
const nickname = document.getElementById('nickname');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: sessionStorage.getItem('nickname'),
  });
  inputMessage.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', inputNickname.value);
  nickname.innerHTML = sessionStorage.getItem('nickname');

  inputNickname.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('nickname', (id) => {
  sessionStorage.setItem('nickname', id);
  nickname.innerHTML = sessionStorage.getItem('nickname');
});

socket.on('message', (message) => createMessage(message));