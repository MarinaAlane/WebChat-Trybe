const socket = window.io();

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('newNickName', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

const createUserList = (message) => {
  const userUl = document.querySelector('#users-online');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userOnline = sessionStorage.getItem('nickname');
  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname: userOnline,
  });
  messageInput.value = '';
  return false;
});

const createMessage = (message) => {
  const messageUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messageUl.appendChild(li);
};

// const updateUserList = (newNickname) => {
//   const oldNickname = sessionStorage.getItem('users-online');
//   const foundUser = document.querySelectorAll('[data-testid="online-user"]')
//   .find((el) => el.textContent === oldNickname);
//   foundUser.remove();
// };

socket.on('message', (message) => createMessage(message));

socket.on('userLoggedIn', (message) => {
  sessionStorage.setItem('nickname', message);
  createUserList(message);
});

socket.on('newNickName', (message) => {
  sessionStorage.setItem('nickname', message);
  createUserList(message);
});