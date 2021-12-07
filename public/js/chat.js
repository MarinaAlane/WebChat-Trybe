const socket = window.io();

const messageForm = document.querySelector('.message-form');
const userForm = document.querySelector('.user-form');
const inputMessage = document.querySelector('#messageInput');
const usernameInput = document.querySelector('#usernameInput');

function generateRandomNickname() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let nickname = '';
  for (let i = 0; i < 16; i += 1) {
    nickname += characters[Math.floor(Math.random() * characters.length)];
  }
  sessionStorage.setItem('nickname', nickname);
  const userList = document.querySelector('.users');
  const li = document.createElement('li');
  li.innerText = `${nickname}`;
  li.setAttribute('data-testid', 'online-user');
  userList.appendChild(li);
}

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', usernameInput.value);
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${message}`;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

window.onload = () => {
  generateRandomNickname();
};