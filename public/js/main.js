const socket = window.io();
const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const inputNickname = document.querySelector('#input-nickname');
const inputChat = document.querySelector('#input-chat');
const buttonChangeNickName = document.querySelector('#button-change-nickname');
const nickname = document.querySelector('#nickname');
const randomNickNameLength = 16;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputChat.value) {
    socket.emit('message', {
      chatMessage: inputChat.value, nickname: nickname.innerText,
    });

    inputChat.value = '';
  }
});
/* eslint no-bitwise: [2, { allow: ["~"] }] */
nickname.innerText = [...Array(randomNickNameLength)]
  .map((_i) => (~~(Math.random() * 36)).toString(36)).join('');

buttonChangeNickName.addEventListener('click', () => {
  nickname.innerText = inputNickname.value;
});

  socket.on('message', (msg) => {
  const newMessage = document
    .createElement('li');
    newMessage.setAttribute('data-testid', 'message');
  newMessage.innerText = msg;
  messages.appendChild(newMessage);
});