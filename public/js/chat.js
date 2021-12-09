const socket = window.io('localhost:3000');

let nickname = 'xxxx';
let chatMessage = '';

const userNameElement = document.querySelector('#username');
const changeUserName = (newUserName) => {
  userNameElement.innerText = newUserName;
};

const nicknameForm = document.querySelector('#formUserNickname');
nicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  nickname = input.value;
  input.value = '';
  userNameElement.innerText = nickname;
  return false;
});

const messageForm = document.querySelector('#userFormMessage');
messageForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const input = event.target[0];
  chatMessage = input.value;
  socket.emit('message', { nickname, chatMessage });
  input.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  const screen = document.querySelector('#screenMessage');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  screen.appendChild(li);
};

const renderOnlineUsers = (users = '') => {
  const li = document.createElement('li');
  const screen = document.querySelector('#onlineUsers');
  
  users.forEach((user) => {
    li.innerText = user;
    screen.appendChild(li);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('userConnected', (serverInfos) => {
  changeUserName(serverInfos.userNickname);
  console.log(serverInfos);
  renderOnlineUsers(serverInfos.usersOnline);
});
