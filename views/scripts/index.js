const socket = window.io();
socket.emit('newNickname');

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.dataset.testid = 'message';
  messagesUl.appendChild(li);
};

const sendMessageForm = document.querySelector('#send-message-form');
const saveNicknameForm = document.querySelector('#save-nickname-form');
let actualNickname;

sendMessageForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const messageInput = document.querySelector('#client-message');
  socket.emit('message', { 
    chatMessage: messageInput.value,
    nickname: actualNickname,
  });
  messageInput.value = '';
});

saveNicknameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const nicknameInput = document.querySelector('#nickname');
  socket.emit('updateNickname', nicknameInput.value);
  nicknameInput.value = '';
});

const createNickname = ({ id = socket.id, nickname }) => {
  const nicknameUl = document.querySelector('#nicknames');
  const nicknameLi = document.createElement('li');
  nicknameLi.innerText = nickname;
  nicknameLi.dataset.testid = 'online-user';
  nicknameLi.dataset.id = id;
  nicknameUl.appendChild(nicknameLi);
  actualNickname = nickname;
};

const clearNicknamesList = () => {
  const nicknameUl = document.querySelector('#nicknames');
  nicknameUl.innerHTML = '';
};

const sortUsers = (users) => {
  if (users.length === 1) return users;
  const primaryUser = users.find((user) => user.id === socket.id);
  const usersWithoutPrimaryUser = users.filter((user) => user.id !== socket.id);
  return [primaryUser, ...usersWithoutPrimaryUser];
};

socket.on('message', async (message) => {
  createMessage(message);
});

socket.on('renderUsersList', (usersList) => {
  clearNicknamesList();
  sortUsers(usersList).forEach((user) => {
    createNickname(user);
  });
});

socket.on('allMessages', (messages) => {
  messages.map(({ timestamp, nickname, message }) => `${timestamp} - ${nickname}: ${message}`)
    .forEach((message) => createMessage(message));
});
