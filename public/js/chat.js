const socket = window.io();

const onlineUser = document.getElementById('online-user');

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', () => {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;

  onlineUser.innerText = username;

  sessionStorage.setItem('username', username);
  socket.emit('updateUsername', username);

  usernameInput.value = '';
});

const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', () => {
  const username = sessionStorage.getItem('username') || onlineUser;
  const messageInput = document.getElementById('message-input');

  const newMessage = {
    chatMessage: messageInput.value,
    nickname: username,   
  };
  socket.emit('message', newMessage);

  messageInput.value = '';
});

const getUsers = () => {
  const usersList = document.getElementById('users-list');
  return usersList.children;
};

const addUser = (username) => {
  const usersList = document.getElementById('users-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = username;

  usersList.appendChild(li);
};

const userIsListed = (username) => {
  const users = getUsers();

  for (let index = 0; index < users.length; index += 1) {
    if (users[index].innerText === username) return true;
  }
  return false;
};

socket.on('username', (data) => {
  onlineUser.innerText = data;
  sessionStorage.setItem('username', data);

  addUser(data);
});

socket.on('updateUsername', ({ oldUsername, newUsername }) => {
  const users = getUsers();

  for (let index = 0; index < users.length; index += 1) {
    if (users[index].innerText === oldUsername) {
      users[index].innerText = newUsername;
      break;
    }
  }
});

socket.on('loggedUser', (data) => {
  addUser(data);

  const username = onlineUser.innerText;

  socket.emit('loggedUser', username);
});

socket.on('addLoggedUsers', (username) => {
  if (!userIsListed(username)) addUser(username);
});

socket.on('removeUser', (username) => {
  const users = getUsers();

  for (let index = 0; index < users.length; index += 1) {
    if (users[index].innerText === username) {
      users[index].remove();
      break;
    }
  }
});

socket.on('message', (data) => {
  const messagesList = document.getElementById('messages-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = data;

  messagesList.appendChild(li);
});