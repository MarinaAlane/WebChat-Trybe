const socket = window.io();

// const nicknameForm = document.querySelector('#nickname-form');
// const nicknameInput = document.querySelector('#nickname');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#messageInput');

// nicknameForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   socket.emit('nickName', nicknameInput.value);
//   nicknameInput.value = '';
//   return false;
// });

const createUserList = (message) => {
  const userUl = document.querySelector('#users-online');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'online-user');
  userUl.appendChild(li);
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: messageInput.value,
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

// socket.on('userList', (message) => createUserList(message));

socket.on('message', (message) => createMessage(message));

socket.on('userLoggedIn', (message) => {
  
  createUserList(message);
});