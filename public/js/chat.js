const socket = window.io();

const messageForm = document.querySelector('#messageForm');
const userForm = document.querySelector('#userForm');
const inputMessage = document.querySelector('#messageInput');
const inputNick = document.querySelector('#nickname');

let userNickname = '';
const dataTestId = 'data-testid';

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    nickname: userNickname,
    chatMessage: inputMessage.value,
  });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(dataTestId, 'message');
  messagesUl.appendChild(li);
};

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  userNickname = inputNick.value;
  socket.emit('newNickname', userNickname);
  sessionStorage.nickname = userNickname;
  inputNick.value = '';
  console.log(userNickname);
  return false;
});

const createUser = (user) => {
  const nicksUl = document.querySelector('#users');
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute(dataTestId, 'online-user');
  nicksUl.appendChild(li);
};

const usersOnline = (users) => {
  const nicksUl = document.querySelector('#users');
  const list = Object.values(users);
  const userIndex = list.indexOf(userNickname);

  nicksUl.innerHTML = '';
  createUser(list[userIndex]);
  list.filter((user) => user !== list[userIndex]).forEach((nickname) => createUser(nickname));
};

const connectUser = () => {
  const { nickname } = sessionStorage;

  if (nickname) {
    socket.emit('newNickname', nickname);
    userNickname = nickname;
  }
};

socket.on('getNick', ((nick) => {
  userNickname = nick;
}));

socket.on('usersOnline', (users) => usersOnline(users));
socket.on('message', (message) => createMessage(message));

window.onload = () => {
  connectUser();
};

window.onbeforeunload = () => {
  socket.disconnect();
};