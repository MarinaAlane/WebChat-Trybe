const socket = window.io('http://localhost:3000');

const messagesUl = document.getElementById('messages');

const nickNameInput = document.getElementById('nickname');
const btnSave = document.getElementById('btnSave');

const messageInput = document.getElementById('message');
const btnMessage = document.getElementById('btnMessage');

btnSave.addEventListener('click', (e) => {
  e.preventDefault();
  
  socket.emit('changeFirstId', nickNameInput.value);
  sessionStorage.setItem('nickname', nickNameInput.value);

  nickNameInput.value = '';
});

btnMessage.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = sessionStorage.getItem('nickname');
  socket.emit('message', { nickname, chatMessage: messageInput.value });
  messageInput.value = '';
});

const createMessage = (greeting) => {
  const createLi = document.createElement('li');
  createLi.innerText = greeting;
  const dataTest = 'data-testid';
  createLi.setAttribute(dataTest, 'online-user');
  messagesUl.appendChild(createLi);
  // createLi.setAttribute(data-testid, 'online-user');
  return false;
};

const createChatMessage = (message) => {
  const createLi = document.createElement('li');
  createLi.innerText = message;
  const dataTest = 'data-testid';
  createLi.setAttribute(dataTest, 'message');
  messagesUl.appendChild(createLi);
  return false;
};

socket.on('firstId', (id) => sessionStorage.setItem('nickname', id));
socket.on('greeting', (message) => createMessage(message));
socket.on('message', (message) => createChatMessage(message));
