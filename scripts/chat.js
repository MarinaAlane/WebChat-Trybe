const socket = window.io('http://localhost:3000');

const divUser = document.querySelector('#users');

const createLi = (id) => {
  const liUsers = document.createElement('li');
  liUsers.innerText = id;
  divUser.appendChild(liUsers);
};

socket.on('connection', (id) => {
  createLi(id);
});

socket.on('connection_users', (arrId) => {
  const lastPosition = arrId[arrId.length - 1];
  sessionStorage.setItem('nickname', lastPosition);
  createLi(lastPosition);
  for (let i = 0; i < arrId.length - 1; i += 1) {
    createLi(arrId[i]);
  }
});

const divMessages = document.querySelector('#messages');
const inputMessage = document.querySelector('#message');
const formMessage = document.querySelector('#message_form');
formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname: sessionStorage.nickname });
});

socket.on('message', (inform) => {
  const liMessage = document.createElement('li');
  liMessage.innerText = inform;
  divMessages.appendChild(liMessage);
});
