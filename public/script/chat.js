const socket = window.io('http://localhost:3000');

const divUser = document.querySelector('#users');
const divMessages = document.querySelector('#messages');
const inputMessage = document.querySelector('#message');
const formMessage = document.querySelector('#message_form');
const formUser = document.querySelector('#user_form');

const createLi = (id) => {
  const liUsers = document.createElement('li');
  liUsers.innerText = id;
  liUsers.setAttribute('data-testid', 'online-user');
  liUsers.setAttribute('class', 'online-user');
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

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = inputMessage.value;
  socket.emit('message', { chatMessage, nickname: sessionStorage.nickname });
});

socket.on('message', (inform) => {
  const liMessage = document.createElement('li');
  liMessage.innerText = inform;
  liMessage.setAttribute('data-testid', 'message');
  divMessages.appendChild(liMessage);
});

formUser.addEventListener('submit', (e) => {
  e.preventDefault();
  const inputUser = document.querySelector('#user');
  const userNickname = inputUser.value;
  const username = document.querySelector('.online-user');
  username.innerText = userNickname;
  socket.emit('alterUsername', { oldNickname: sessionStorage.nickname, userNickname });
  sessionStorage.setItem('nickname', userNickname);
});

socket.on('updateUsers', (oldNickname, userNickname) => {
  console.log(oldNickname, userNickname);
  const usersnames = document.querySelectorAll('.online-user');
  usersnames.forEach((res) => {
    if (res.innerText === oldNickname) {
      res.innerText = userNickname;
    }
  });
});
