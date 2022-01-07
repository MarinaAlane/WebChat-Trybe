const socket = window.io();
const sendMessageForm = document.querySelector('#send-message-form');
const saveNicknameForm = document.querySelector('#save-nickname-form');
let actualNickname = '';

sendMessageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('#client-message');
  socket.emit('message', { chatMessage: messageInput.value, nickname: actualNickname });
  messageInput.value = '';
});

saveNicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nicknameInput = document.querySelector('#nickname');
  actualNickname = nicknameInput.value;
  socket.emit('clientNickname', actualNickname);
  nicknameInput.value = '';
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

const createNickname = (nickname) => {
  const nicknameUl = document.querySelector('#nicknames');
  const li = document.createElement('li');
  li.innerText = nickname;
  li.dataset.testid = 'online-user';
  nicknameUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('nickname', (nickname) => createNickname(nickname));
