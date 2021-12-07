const socket = window.io();

const nicknameForm = document.querySelector('#nicknameForm');
const nicknameInput = document.querySelector('#nicknameInput');
const nicknameContainer = document.querySelector('#user-nickname');
const messageForm = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');
const usersContainer = document.querySelector('#users');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: nicknameContainer.innerText,
  });
  inputMessage.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('updateUser', {
    username: nicknameContainer.innerText,
    newUsername: nicknameInput.value,
  });
  nicknameInput.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

const renderNickname = (nickname) => { nicknameContainer.innerText = nickname; };

const renderUsers = (users) => {
  let usersHtml = '';
  users.forEach((user) => {
    if (user === sessionStorage.getItem('username')) return;
    usersHtml = `${usersHtml}<li data-testid="online-user">${user}</li>`;
  });
  usersContainer.innerHTML = usersHtml;
};

socket.on('user', (username) => {
  sessionStorage.removeItem('username');
  sessionStorage.setItem('username', username);
  renderNickname(username);
});
socket.on('welcomeMessage', (nickname) => createMessage(`${nickname} entrou no chat`));
socket.on('message', (message) => createMessage(message));
socket.on(
  'changeUserMessage',
  ({ username, newUsername }) => createMessage(`${username} trocou o nick para ${newUsername}`),
);
socket.on('disconnectMessage', (nickname) => createMessage(`${nickname} saiu do chat`));
socket.on('renderUsers', (users) => renderUsers(users));
