const socket = window.io();

const messageForm = document.querySelector('.messageForm');
const nicknameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#nick_name');
const messageInput = document.querySelector('#text_message');
const usersTable = document.querySelector('#userOnlineTable');
const labelNickName = document.querySelector('#labelNickName');

const bodyTable = document.querySelector('#chatBodyTable');

function makeNickName() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  sessionStorage.setItem('nickname', text);
  return text;
}

messageForm.addEventListener('submit', (e) => {
  const chatMessage = messageInput.value;
  const nickUser = sessionStorage.getItem('nickname');
  console.log(chatMessage);
  e.preventDefault();
  socket.emit('message', { chatMessage, nickname: nickUser });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  const nickname = nicknameInput.value;
  const oldNickname = sessionStorage.getItem('nickname');
  e.preventDefault();
  sessionStorage.setItem('nickname', nickname);
  labelNickName.innerText = 'Nickname';
  socket.emit('updateNick', { nickname, oldNickname });
  return false;
});

function createMessage(message) {
  const trMessage = document.createElement('tr');
  const newMessage = document.createElement('td');
  newMessage.textContent = message;
  newMessage.setAttribute('data-testid', 'message');
  trMessage.appendChild(newMessage);
  bodyTable.appendChild(trMessage);
  window.scrollTo(0, document.body.scrollHeight);
  nicknameInput.value = sessionStorage.getItem('nickname');
  labelNickName.innerText = 'Nickname';
}

socket.on('message', (msg) => {
  createMessage(msg);
});

function createTableUser(user) {
  const trUser = document.createElement('tr');
  const newUser = document.createElement('td');
  newUser.textContent = user;
  newUser.setAttribute('data-testid', 'online-user');
  trUser.appendChild(newUser);
  usersTable.appendChild(trUser);
  window.scrollTo(0, document.body.scrollHeight);
}

socket.on('usersOn', (users) => {
  console.log(users);
  const userNick = sessionStorage.getItem('nickname');
  usersTable.innerHTML = '';
  createTableUser(userNick);
  users.forEach((user) => {
    if (user.nick !== userNick) { createTableUser(user.nick); }
  });
});

socket.on('history', (history) => {
  history.forEach(({ message, nickname, timestamp }) => {
    createMessage(`${timestamp} ${nickname}: ${message}`);
  });
});

window.onload = () => {
  socket.emit('newUser', makeNickName());
  socket.emit('getHistory');
};