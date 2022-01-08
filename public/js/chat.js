const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nicknameInput');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: inputNickname.value,
  });
  inputNickname.value = '';
  inputMessage.value = '';
  return false;
});
