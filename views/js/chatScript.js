const socket = window.io();

const TEST_ID = 'data-testid';

const messageForm = document.getElementById('message-form');
const inputMessage = document.getElementById('message-input');

const nicknameForm = document.getElementById('nickname-form');
const inputNickname = document.getElementById('nickname-input');
const nickname = document.getElementById('nickname');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: sessionStorage.getItem('nickname'),
  });
  inputMessage.value = '';
  return false;
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('changeNickname', {
    newUser: inputNickname.value,
    oldUser: nickname.innerHTML,
  });
  sessionStorage.setItem('nickname', inputNickname.value);
  nickname.innerHTML = sessionStorage.getItem('nickname');
  socket.nickname = nickname.innerHTML;

  inputNickname.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(TEST_ID, 'message');
  messagesUl.appendChild(li);
};

const createUser = (user) => {
  const userUl = document.getElementById('users');
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute(TEST_ID, 'online-user');
  userUl.appendChild(li);
};
const clearUserList = () => {
  const userUl = document.getElementById('users');
  const newUl = userUl.cloneNode(false);
  userUl.parentNode.replaceChild(newUl, userUl);
};
const updateUserList = (users) => {
  clearUserList();
  const userUl = document.getElementById('users');
  users.forEach((user) => {
    if (user !== nickname.innerText) {
      createUser(user);
    }
  });
  const li = document.createElement('li');
  li.innerText = nickname.innerText;
  li.setAttribute(TEST_ID, 'online-user');
  userUl.insertBefore(li, userUl.firstChild);
};

socket.on('nickname', (id) => {
  sessionStorage.setItem('nickname', id);
  nickname.innerHTML = sessionStorage.getItem('nickname');
  socket.nickname = nickname.innerHTML;
});

socket.on('message', (message) => createMessage(message));

socket.on('userList', (users) => {
  updateUserList(users.map((user) => user.nickname));
});

window.onbeforeunload = function disconnect() {
  socket.disconnect();
};