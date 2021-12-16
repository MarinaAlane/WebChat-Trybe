const socket = window.io('http://localhost:3000');

const divUser = document.querySelector('#users');
const inputMessage = document.querySelector('#input-message');
const formMessage = document.querySelector('#form-message');
const messages = document.querySelector('#messages');
const formUser = document.querySelector('#form-user');

const ONLINE_USER = '.online-user';

const createUserLi = (id) => {
  const UserLi = document.createElement('li');
  UserLi.innerText = id;
  UserLi.setAttribute('data-testid', 'online-user');
  UserLi.setAttribute('class', 'online-user');
  divUser.appendChild(UserLi);
};

const createMessageLi = (msg) => {
  const newMessage = document.createElement('li');
  newMessage.innerText = msg;
  newMessage.setAttribute('data-testid', 'message');
  messages.appendChild(newMessage);
};

socket.on('connection', (id) => {
  createUserLi(id);
});

socket.on('connection_users', (arrId) => {
  const lastPosition = arrId[arrId.length - 1];
  sessionStorage.setItem('nickname', lastPosition);
  createUserLi(lastPosition);
  for (let i = 0; i < arrId.length - 1; i += 1) {
    createUserLi(arrId[i]);
  }
});

formMessage.addEventListener('submit', (event) => {
  event.preventDefault();
    const chatMessage = inputMessage.value;
    socket.emit('message', { chatMessage, nickname: sessionStorage.nickname });
    inputMessage.value = '';
});

socket.on('message', (msg) => {
  createMessageLi(msg);
});

formUser.addEventListener('submit', (event) => {
  event.preventDefault();
  const inputUser = document.querySelector('#input-user');
  const userNickname = inputUser.value;
  const userName = document.querySelector(ONLINE_USER);
  userName.innerText = userNickname;
  socket.emit('alterUsername', { oldNickName: sessionStorage.nickname, userNickname });
  sessionStorage.setItem('nickname', userNickname);
});

socket.on('disconnect_user', (id) => {
  const usernames = document.querySelectorAll(ONLINE_USER);
  usernames.forEach((res) => {
    if (res.innerText === id) {
      res.remove();
    }
  });
});

socket.on('updateUsers', (oldNickname, userNickname) => {
  const usernames = document.querySelectorAll(ONLINE_USER);
  usernames.forEach((res) => {
    if (res.innerText === oldNickname) {
      res.innerText = userNickname;
    }
  });
});

const fetchMessages = async () => {
  const result = await fetch('http://localhost:3000/chat');
  const jsonResult = await result.json();
  jsonResult.forEach((item) => {
    const message = `${item.timestamp} - ${item.nickname}: ${item.message}`;
    createMessageLi(message);
  });
};

fetchMessages();