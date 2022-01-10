const socket = window.io();

// Lógica construída com a ajuda do aluno Luiz Wendel - Turma 11
// e do aluno (Lima-Lima)- João Lima - Turma 11.

const onLineUser = (users) => {
  const userOnLineUl = document.querySelector('#client');
  userOnLineUl.innerHTML = '';
  const userNick = sessionStorage.getItem('nickname');
  users.forEach((user) => {
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = user;
    if (user === userNick) {
      userOnLineUl.prepend(li);
    } else {
      userOnLineUl.appendChild(li);
    }
  });
};

socket.on('user', (users) => onLineUser(users));

const formClient = document.querySelector('#client-form');
const inputNickname = document.querySelector('#clientInput');

formClient.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('nickname', inputNickname.value);
  const userNickName = sessionStorage.getItem('nickname');
  socket.emit('userNick', userNickName);
  inputNickname.value = '';
});

const formMessages = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#messageInput');

formMessages.addEventListener('submit', (e) => {
  const nickname = sessionStorage.getItem('nickname');
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname,
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

socket.on('setup', ({ userName, allMessages }) => {
  sessionStorage.setItem('nickname', userName);
  allMessages.forEach(({ message, nickname, timestamp }) => {
    createMessage(`${timestamp} - ${nickname}: ${message}`);
  });
});