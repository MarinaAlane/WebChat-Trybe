const socket = window.io();

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname');
const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#messageInput');

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const oldNickname = sessionStorage.getItem('userNickname');
  socket.emit('newNickName', {
    newNickname: nicknameInput.value,
    oldNickname,
  });
  sessionStorage.setItem('userNickname', nicknameInput.value);
  nicknameInput.value = '';
  return false;
});

const createUserList = (message) => {
  const userUl = document.querySelector('#users-online');
  userUl.innerHTML = '';
  const pageOwner = sessionStorage.getItem('userNickname');
  message.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.setAttribute('data-testid', 'online-user');
    li.setAttribute('id', user);
    if (user === pageOwner) {
      userUl.insertBefore(li, userUl.firstChild);
    } else {
      userUl.appendChild(li);
    }
  });
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const userOnline = sessionStorage.getItem('userNickname');
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

socket.on('connect', () => {
  const randomNickname = socket.id.slice(0, 16);
  sessionStorage.setItem('userNickname', randomNickname); // setaria no banco de dados
  socket.emit('userLoggedIn', randomNickname);
});

socket.on('userLoggedIn', (message) => {
  createUserList(message); // refatorar essa funçao e analisar se não é necessário modificar
});

socket.on('newNickName', (message) => {
  createUserList(message);
});

socket.on('message', (message) => {
  createMessage(message);
});

window.onbeforeunload = () => {
  const pageOwner = sessionStorage.getItem('userNickname');
  socket.emit('end', pageOwner);
  socket.disconnect();
};