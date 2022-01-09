const socket = window.io();

const onLineUser = (user) => {
  const userOnLineUl = document.querySelector('#client');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = user;
  userOnLineUl.appendChild(li);
};

socket.on('user', (user) => onLineUser(user));

const formClient = document.querySelector('#client-form');
const inputNickname = document.querySelector('#clientInput');

formClient.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', inputNickname.value);
  const userNickName = sessionStorage.getItem('nickname');
  socket.emit('userNick', userNickName);
  const userOnLineUl = document.querySelector('#client');
  while (userOnLineUl.firstChild) {
    userOnLineUl.removeChild(userOnLineUl.firstChild);
  }
  onLineUser(userNickName);
  inputNickname.value = '';
  return false;
});

const formMessages = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#messageInput');

formMessages.addEventListener('submit', (e) => {
  const nickName = socket.id.substring(0, 16);
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: nickName,
  });
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

socket.on('message', (message) => createMessage(message));
