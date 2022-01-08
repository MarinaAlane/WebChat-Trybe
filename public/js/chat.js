const socket = window.io();

const userNickname = 'user-nickname';
const messageForm = document.querySelector('#message_form');
const nicknameForm = document.querySelector('#nickname_form');

const generateNickname = () => {
  socket.emit('nickname');
  socket.emit('signIn');
};

const addUserToList = (userNick) => {
  const messagesUl = document.querySelector('#online-users');
  const sessionUser = document.querySelector(`#${userNickname}`).innerText;
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  if (userNick === sessionUser) {
    li.setAttribute('id', 'session-user');
  }
  li.innerText = userNick;
  messagesUl.appendChild(li);
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = document.querySelector('#messageInput');
  const nickname = document.querySelector(`#${userNickname}`).innerText;
  console.log('Right b4 emit');
  socket.emit('message', { chatMessage: chatMessage.value, nickname });
  console.log('Right after emit');
  chatMessage.value = '';
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameInput = document.querySelector('#nicknameInput');
  document.querySelector(`#${userNickname}`).innerText = nicknameInput.value;
  nicknameInput.value = '';
});

const createMessage = (message) => {
  console.log('Called createMessage', message);
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('clientMessage', (message) => createMessage(message));

socket.on('nickname', (userNick) => {
  document.querySelector(`#${userNickname}`).innerText = userNick;
});

socket.on('signIn', (userNick) => {
  addUserToList(userNick);
});

window.onload = () => {
  generateNickname();
};
