const socket = window.io();

const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nicknameInput');
const nickNameText = document.querySelector('#nickNameText');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: nickNameText.innerText,
  });
  inputNickname.value = '';
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const ul = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  ul.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

const nickNameForm = document.querySelector('#nickNameForm');
const inputUserName = document.querySelector('#nickNameInput');
nickNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickNameText.innerText = inputUserName.value;
});
