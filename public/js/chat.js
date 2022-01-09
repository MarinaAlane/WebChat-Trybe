const socket = window.io();

const userNickname = 'user-nickname';
const messageForm = document.querySelector('#message_form');
const nicknameForm = document.querySelector('#nickname_form');
const userListId = '#online-users';
const userId = '[data-testid="online-user"]';

const generateNickname = () => {
  socket.emit('nickname');
  socket.emit('signIn');
};

const addUserToList = (userNick) => {
  const messagesUl = document.querySelector(userListId);
  const sessionUser = document.querySelector(`#${userNickname}`).innerText;
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  if (userNick === sessionUser) {
    li.setAttribute('id', 'session-user');
  }
  li.innerText = userNick;
  messagesUl.appendChild(li);
};

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const chatMessage = document.querySelector('#messageInput');
  const nickname = document.querySelector(`#${userNickname}`).innerText;
  console.log('Right b4 emit');
  socket.emit('message', { chatMessage: chatMessage.value, nickname });
  console.log('Right after emit');
  chatMessage.value = '';
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameInput = document.querySelector('#nicknameInput');
  const oldNick = document.querySelector(`#${userNickname}`).innerText;
  document.querySelector(`#${userNickname}`).innerText = nicknameInput.value;
  socket.emit('updateNick', oldNick, nicknameInput.value);
  nicknameInput.value = '';
});

const createMessage = (message) => {
  console.log('Called createMessage', message);
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

socket.on('nickname', (userNick) => {
  document.querySelector(`#${userNickname}`).innerText = userNick;
});

socket.on('signIn', (userNick) => {
  addUserToList(userNick);
  socket.emit('callUpdateUsers');
});

socket.on('updateNick', (oldNick, newNick) => {
  const list = document.querySelectorAll(userId);
  const listIds = [];
  list.forEach((u) => {
    if (u.innerText === oldNick) {
      listIds.push(newNick);
    } else {
      listIds.push(u.innerText);
    }
  });
  document.querySelector(userListId).innerHTML = '';
  listIds.forEach((user) => {
    addUserToList(user);
  });
});

socket.on('updateUsers', (socketId) => {
  const userNick = document.querySelector(`#${userNickname}`).innerText;
  socket.emit('getUsers', socketId, userNick);
});

socket.on('getUsers', (user) => {
  const list = document.querySelectorAll(userId);
  const listIds = [];
  list.forEach((u) => {
    listIds.push(u.innerText);
  });
  if (!listIds.includes(user)) {
    addUserToList(user);
  }
});

socket.on('removeUser', (nickname) => {
  const list = document.querySelectorAll(userId);
  const listIds = [];
  list.forEach((u) => {
    if (u.innerText === nickname) {
      console.log(`${nickname} deleted`);
    } else {
      listIds.push(u.innerText);
    }
  });
  document.querySelector(userListId).innerHTML = '';
  listIds.forEach((user) => {
    addUserToList(user);
  });
});

window.onload = () => {
  generateNickname();
};
