const socket = window.io();
const datatestId = 'data-testid';

const messageForm = document.querySelector('.message-form');
const userForm = document.querySelector('.user-form');
const inputMessage = document.querySelector('#messageInput');
const usernameInput = document.querySelector('#usernameInput');
const userList = document.querySelector('.users');

function generateRandomNickname() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let nickname = '';
  for (let i = 0; i < 16; i += 1) {
    nickname += characters[Math.floor(Math.random() * characters.length)];
  }
  sessionStorage.setItem('nickname', nickname);
  socket.emit('user', nickname);
  return nickname;
}

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${message}`;
  li.setAttribute(datatestId, 'message');
  messagesUl.appendChild(li);
};

const getMessageHistory = () => {
  socket.emit('get-message-history');
  socket.on('message-history', (messages) => {
    messages.forEach(({ message, nickname, timestamp }) => {
      createMessage(`${timestamp} ${nickname} ${message}`);
    });
  });
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('changeUsername', usernameInput.value);
  sessionStorage.setItem('nickname', usernameInput.value);
  return false;
});

const createUser = (users) => {
  userList.innerHTML = '';
  const actualUser = sessionStorage.getItem('nickname');
  const listItem = document.createElement('li');
  listItem.innerText = `${actualUser}`;
  listItem.setAttribute(datatestId, 'online-user');
  userList.appendChild(listItem);
  users.forEach((user) => {
    if (user.nickname !== actualUser) {
      const li = document.createElement('li');
      li.innerText = `${user.nickname}`;
      li.setAttribute('data-testid', 'online-user');
      userList.appendChild(li);
    }
  });
};

socket.on('message', (message) => createMessage(message));

socket.on('user', (users) => createUser(users));

window.onload = () => {
  generateRandomNickname();
  getMessageHistory();
};