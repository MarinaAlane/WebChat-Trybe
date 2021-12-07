const socket = window.io();

const formMessage = document.querySelector('#messageForm');
const inputMessage = document.querySelector('#messageInput');

const formNickname = document.querySelector('.nicknameForm');
const inputNickname = document.querySelector('#nicknameInput');

const userNickname = document.querySelector('#nickname');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname: userNickname.innerText });
  inputMessage.value = '';
  return false;
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  userNickname.innerText = inputNickname.value;
  inputNickname.value = '';
});

const createMessage = (message) => {
  console.log(socket.id);
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const cutID = (id) => id.slice(-16);

const showUserNickname = () => {
  socket.emit('generateNickname');

  socket.on('generateNickname', (id) => {
    userNickname.innerText = cutID(id);
  });
};

showUserNickname();

socket.on('message', (message) => createMessage(message));