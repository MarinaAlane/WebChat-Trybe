const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const userForm = document.querySelector('#userForm');
const inputMessage = document.querySelector('#messageInput');
const inputNick = document.querySelector('#nickname');

let userNickname = '';

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: userNickname,
    chatMessage: inputMessage.value,
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userNickname = inputNick.value;
  socket.emit('newNickname', userNickname);
  inputNick.value = '';
  return false;
});

const createUser = (nickname) => {
  const nicksUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.innerText = nickname;
  nicksUl.appendChild(li);
};

const createRandomUser = () => {
  const nicksUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.innerText = socket.id.split('', 16).join('');
  userNickname = li.innerText;
  li.setAttribute('data-testid', 'online-user');
  nicksUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));
socket.on('serverNick', (nickname) => createUser(nickname));
socket.on('connect', () => createRandomUser());

window.onbeforeunload = () => {
  socket.disconnect();
};