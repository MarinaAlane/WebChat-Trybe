const socket = window.io();
const messages = document.querySelector('#messages');
const form = document.querySelector('#form');
const inputNickname = document.querySelector('#input-nickname');
const inputChat = document.querySelector('#input-chat');

console.log('auau');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputChat.value) {
    socket.emit('message', {
      chatMessage: inputChat.value, nickname: inputNickname.value,
    });

    inputChat.value = '';
  }
});

socket.on('message', (msg) => {
  const newMessage = document
    .createElement('li');
  newMessage.innerText = msg;
  messages.appendChild(newMessage);
});