const socket = window.io();

const ul = document.querySelector('#usersList');
const ulMessages = document.querySelector('#messages');
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
const inputNickname = document.querySelector('#nicknameInput');
const DATA_TEST_ID = 'data-testid';

form.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: document.querySelector('#usersList').firstChild.innerText,
  });
  inputNickname.value = '';
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(DATA_TEST_ID, 'message');
  ulMessages.appendChild(li);
};

const createUsersList = (users) => {
  const currentUser = users.find((user) => user.socketId === socket.id);
  const newUsers = users.filter(
    (user) => user.socketId !== currentUser.socketId,
  );
  newUsers.unshift(currentUser);
  ul.innerHTML = '';
  newUsers.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user.nickname;
    li.setAttribute(DATA_TEST_ID, 'online-user');
    ul.appendChild(li);
  });
};

socket.on('message', (message) => createMessage(message));
socket.on('users', (users) => createUsersList(users));

socket.on('getMessages', (messages) => {
  messages.forEach((message) => {
    const li = document.createElement('li');
    li.setAttribute(DATA_TEST_ID, 'message');
    li.innerText = `${message.timestamp} - ${message.nickname}: ${message.message}`;
    ulMessages.appendChild(li);
  });
});

const nickNameForm = document.querySelector('#nickNameForm');
const inputUserName = document.querySelector('#nickNameInput');
nickNameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('updateUser', inputUserName.value);
});
