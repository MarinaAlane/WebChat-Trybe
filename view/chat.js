const socket = window.io();

const messageForm = document.querySelector('#messages');
const messageInput = document.querySelector('#message-input');
const nicknameForm = document.querySelector('#nickname');
const nicknameInput = document.querySelector('#name-input');
const name = document.querySelector('#name');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  console.log(messageInput.value);
  socket.emit('message', { chatMessage: messageInput.value, nickname: name.innerText });
  messageInput.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  name.innerText = nicknameInput.value;
  sessionStorage.setItem('user', nicknameInput.value);
  socket.emit('user', { nickname: nicknameInput.value, action: 'updateUser' });
  nicknameInput.value = '';
});

const userName = () => {
  socket.emit('nickname');
  socket.on('nickname', (id) => {
    const user = id.slice(-16);
    name.innerText = user;
    sessionStorage.setItem('user', user);
    socket.emit('user', { nickname: user, action: 'newUser' });
  });
};

userName();

socket.on('message', (message) => {
  const chat = document.querySelector('#message-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  chat.appendChild(li);
});

socket.on('online', (nicknames) => {
  const onlineUsers = document.querySelector('#online');
  onlineUsers.innerText = '';

  nicknames.forEach(({ nickname }) => {
    if (nickname !== sessionStorage.getItem('user')) {
      const li = document.createElement('li');
      li.setAttribute('data-testid', 'online-user');
      li.innerText = nickname;
      onlineUsers.appendChild(li);
    }
  });
});
