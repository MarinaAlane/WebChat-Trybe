const socket = window.io();
const userConnect = document.getElementById('users');
const formMessages = document.getElementById('form');
const messagesUsers = document.getElementById('messages');
const messageBox = document.getElementById('message-box');
const nicknameBox = document.getElementById('nickname-box');
const saveNickname = document.getElementById('nickname-button');

let nickname = '';

formMessages.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname,
    chatMessage: messageBox.value,
  });
  messageBox.value = '';
});

saveNickname.addEventListener('click', (event) => {
  event.preventDefault();
  nickname = nicknameBox.value;
  nicknameBox.value = '';
  socket.emit('saveNickname', nickname);
});

const createMessages = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUsers.appendChild(li);
};

const getMessages = (messages) => {
  messages.forEach((message) => {
    createMessages(
      `${message.timestamp} - ${message.nickname}: ${message.message}`,
    );
  });
};

const userCreated = (newId) => {
  nickname = newId;
  socket.emit('usersOnline');
};

const updateUsers = (user) => {
  const li = document.createElement('li');
  li.innerText = user.nickname;
  li.setAttribute('data-testid', 'online-user');
  userConnect.appendChild(li);
};

const getUsersOnline = (users) => {
  userConnect.innerHTML = '';
  const user = users.find((item) => item.id === socket.id);
  updateUsers(user);
  users.forEach((item) => item.id !== socket.id && updateUsers(item));
};

socket.on('message', createMessages);
socket.on('newUser', userCreated);
socket.on('allMessages', getMessages);
socket.on('usersOnline', getUsersOnline);
