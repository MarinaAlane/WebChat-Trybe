const socket = window.io();

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

const createMessage = (message) => {
  const messagesUl = document.querySelector('.messages');
  const li = document.createElement('li');
  li.innerText = `${message}`;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const createUser = (users) => {
  userList.innerHTML = '';
  const actualUser = sessionStorage.getItem('nickname');
  const listItem = document.createElement('li');
  listItem.innerText = `${actualUser}`;
  listItem.setAttribute('data-testid', 'online-user');
  userList.appendChild(listItem);
  console.log(users);
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
};