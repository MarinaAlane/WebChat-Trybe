const socket = window.io();

const formClient = document.querySelector('#client-form');
const inputNickname = document.querySelector('#clientInput');

formClient.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('nickname', inputNickname.value);
  inputNickname.value = '';
  return false;
});

const saveNickname = (nickname) => {
  const clientNameUl = document.querySelector('#client');
  const li = document.createElement('li');
  li.innerText = nickname;
  clientNameUl.appendChild(li);
};

socket.on('nickname', (nickname) => saveNickname(nickname));

const formMessages = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#messageInput');

formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: socket.id,
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
