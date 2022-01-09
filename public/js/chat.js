const socket = window.io();

let nickname = '';

// message area
const sendBtn = document.querySelector('#sendBtn');
const inputMessage = document.querySelector('#messageInput');

sendBtn.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return false;
});

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute('data-testid', 'message');
  messagesUl.appendChild(li);
};

socket.on('message', (message) => createMessage(message));

// add user area
const createUsers = (users) => {
  const usersList = document.querySelector('#usersList');
  while (usersList.lastElementChild) {
    usersList.removeChild(usersList.lastElementChild);
  }

  users.forEach((username) => {
    const userLi = document.createElement('li');
    userLi.innerText = username;
    usersList.appendChild(userLi);
  });
};

socket.on('userConnected', ({ userList, username }) => {
  nickname = username;
  createUsers(userList);
});

// change nickname
const nickInput = document.querySelector('#nickInput');
const nickBtn = document.querySelector('#nickBtn');

nickBtn.addEventListener('click', () => {
  if (nickInput.value) {
    nickname = nickInput.value;
    socket.emit('changeNick', nickInput.value);

    nickInput.value = '';
  }
  return false;
});

socket.on('nickChanged', (users) => createUsers(users));
