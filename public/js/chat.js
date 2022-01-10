const socket = window.io();

const users = document.getElementById('users');
const messages = document.getElementById('messages');
const form = document.getElementById('form');
const messageBox = document.getElementById('message-box');
const nicknameBox = document.getElementById('nickname-box');
const nicknameButton = document.getElementById('nickname-button');

let nickname = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  socket.emit('message', {
    nickname,
    chatMessage: messageBox.value,
  });
  messageBox.value = '';
});

nicknameButton.addEventListener('click', () => {
  nickname = nicknameBox.value;
  nicknameBox.value = '';
  socket.emit('saveNickname', nickname);
});

const createnewMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messages.appendChild(li);
};

const createUser = (newNickname) => {
  nickname = newNickname;
  socket.emit('usersOnline');
};

const listUsers = (user) => {
  const li = document.createElement('li');
  li.innerText = user.nickname;
  li.setAttribute('data-testid', 'online-user');
  users.appendChild(li);
};

const setUserList = (userList) => {
  users.innerHTML = '';
  const clientUser = userList.find((user) => user.id === socket.id);
  listUsers(clientUser);
  userList.forEach((user) => user.id !== socket.id && listUsers(user));
};

const getMessageList = (messageList) => {
  messageList.forEach((message) => {
    createnewMessage(
      `${message.timestamp} - ${message.nickname}: ${message.message}`,
    );
  });
};

socket.on('message', createnewMessage);
socket.on('newUser', createUser);
socket.on('usersOnline', setUserList);
socket.on('getMessages', getMessageList);
