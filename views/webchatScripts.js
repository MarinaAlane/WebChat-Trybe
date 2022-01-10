const socket = window.io();
const messages = document.getElementById('messages');
const formNickname = document.getElementById('form-nickname');
const formMessage = document.getElementById('form-message');
const inputNickname = document.getElementById('input-nickname');
const inputChat = document.getElementById('input-chat');
const userNickname = document.getElementById('user-nickname');
const userAbout = document.getElementById('user-about');
const dataTestId = 'data-testid';

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();

  if (inputNickname.value) {
    socket.emit('user', inputNickname.value);
    
    sessionStorage.setItem('nickname', inputNickname.value);
    const newNickname = sessionStorage.getItem('nickname');
    userAbout.firstChild.innerText = newNickname;

    inputNickname.value = '';
  }
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');

  if (inputChat.value) {
    socket.emit('message', {
      chatMessage: inputChat.value, nickname,
    });

    inputChat.value = '';
  }
});

socket.on('nickname', (newUserNickname) => {
  sessionStorage.setItem('nickname', newUserNickname);
  const createdNickname = sessionStorage.getItem('nickname');
  userNickname.innerText = createdNickname;
});

socket.on('online', (users) => {
  sessionStorage.setItem('users', JSON.stringify(users));
  const savedUsers = JSON.parse(sessionStorage.getItem('users'));
  const nickname = sessionStorage.getItem('nickname');
  userAbout.innerHTML = '';

  const li = document.createElement('li');
  li.setAttribute(dataTestId, 'online-user');
  li.innerText = nickname;
  userAbout.appendChild(li);

  savedUsers.forEach((user) => {
    if (user.nickname !== nickname) {
      const liEl = document.createElement('li');
      liEl.setAttribute(dataTestId, 'online-user');
      liEl.innerText = user.nickname;
      userAbout.appendChild(liEl);
    }
  });
});

socket.on('message', (msg) => {
  const newMessage = document.createElement('li');
  newMessage.setAttribute(dataTestId, 'message');
  newMessage.innerText = msg;
  messages.appendChild(newMessage);
});
