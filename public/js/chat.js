const socket = window.io();

const messageForm = document.querySelector('.messageForm');
const nicknameForm = document.querySelector('.nicknameForm');
const nicknameInput = document.querySelector('#nick_name');
const messageInput = document.querySelector('#text_message');
const usersTable = document.querySelector('#userTable');
const labelNickName = document.querySelector('#labelNickName');

const bodyTable = document.querySelector('#chatBodyTable');

function makeNickName() {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 16; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
}

function createNickName() {
  const nick = sessionStorage.getItem('nickname');
  if (nick === null) {
    const newNick = makeNickName();
    sessionStorage.setItem('nickname', newNick);
  }
  return nick;
}

messageForm.addEventListener('submit', (e) => {
  const chatMessage = messageInput.value;
  console.log(chatMessage);
  e.preventDefault();
  socket.emit('message', { chatMessage, nickname: createNickName() });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  const nickname = nicknameInput.value;
  e.preventDefault();
  sessionStorage.setItem('nickname', nickname);
  labelNickName.innerText = 'Nickname';
  return false;
});

socket.on('message', (msg) => {
  const trMessage = document.createElement('tr');
  const newMessage = document.createElement('td');
  newMessage.textContent = msg;
  newMessage.setAttribute('data-testid', 'message');
  trMessage.appendChild(newMessage);
  bodyTable.appendChild(trMessage);
  window.scrollTo(0, document.body.scrollHeight);
  nicknameInput.value = sessionStorage.getItem('nickname');
  labelNickName.innerText = 'Nickname';
});

socket.on('userOn', (user) => {
  sessionStorage.setItem('nickname', user);
  const trUser = document.createElement('tr');
  const newUser = document.createElement('td');
  newUser.textContent = user;
  newUser.setAttribute('data-testid', 'online-user');
  trUser.appendChild(newUser);
  usersTable.appendChild(trUser);
  window.scrollTo(0, document.body.scrollHeight);
});

window.onload = () => {
  socket.emit('newUser', makeNickName());
};