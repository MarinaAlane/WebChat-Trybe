const socket = window.io();

let nickName = '';

const buttonNick = document.querySelector('#btn-nickname');
const buttonChat = document.querySelector('#btn-message');
const ulChat = document.querySelector('#list-message');
const ulNick = document.querySelector('#list-nickname');

const createFirstMessage = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  ulChat.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.className = 'users';
  li.innerText = user;
  ulNick.appendChild(li);
};

socket.on('newConnection', ({ user, todaInfo }) => {
  todaInfo.forEach((e) => createFirstMessage(e));
  nickName = user;
  socket.emit('nickname', user);
});

socket.on('users', (users) => {
  document.querySelectorAll('.users').forEach((e) => {
    ulNick.removeChild(e);
  });

  createUser(nickName);
  users.forEach((user) => {
    if (user !== nickName) {
      createUser(user);
    }
  });
});

buttonNick.addEventListener('click', (e) => {
  e.preventDefault();
  const nick = document.querySelector('#input-nickname');
  nickName = nick.value;
  socket.emit('nickname', nickName);
  nick.value = '';
  return false;
});

buttonChat.addEventListener('click', (e) => {
  e.preventDefault();
  const message = document.querySelector('#input-message');
  socket.emit('message', { messageValue: message.value, nickName });
  message.value = '';
  return false;
});

socket.on('message', (response) => {
  createFirstMessage(response);
});
