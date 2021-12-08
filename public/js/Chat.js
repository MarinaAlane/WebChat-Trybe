const socket = window.io();

// NICKNAME

const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  const oldNick = sessionStorage.getItem('nickname');
  const newNick = nicknameBox.value;
  const li = document.querySelector(`#${oldNick}`);
  sessionStorage.setItem('nickname', newNick);
  li.innerHTML = newNick;
  li.id = newNick;
  nicknameBox.value = '';
});

const generateRandomNick = () => {
  const alfabeto = 'abcdefghijklmnopqrstuvxzwy';
  let nick = '';
  for (let i = 0; i < 16; i += 1) {
    nick += alfabeto[Math.floor(Math.random() * 26)];
  }
  return nick;
};

sessionStorage.setItem('nickname', generateRandomNick());

socket.on('createNick', () => {
  const onlineList = document.querySelector('#online-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  const nickname = sessionStorage.getItem('nickname');
  li.id = nickname;
  li.innerHTML = nickname;
  onlineList.appendChild(li);
});

// CHAT

const messagesList = document.querySelector('#messages-list');
const sendButton = document.querySelector('#send-button');
const messageInput = document.querySelector('#message-box');

const createMessage = (msg) => {
  const li = document.createElement('li');
  li.innerHTML = msg;
  li.setAttribute('data-testid', 'message');
  messagesList.appendChild(li);
  messageInput.value = '';
};

sendButton.addEventListener('click', () => {
  const chatMessage = messageInput.value;
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', (message) => {
  createMessage(message);
});
