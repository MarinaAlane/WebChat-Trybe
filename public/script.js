const socket = window.io();
const userForm = document.getElementById('userForm');
const messageForm = document.getElementById('messageForm');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { target: { elements: { messageInput } } } = e;
  const obj = {
    chatMessage: messageInput.value,
    nickname: socket.username,
  };
  socket.emit('message', obj);
  messageInput.value = '';
  return false;
});

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const { target: { elements: { usernameInput } } } = e;

  const obj = {
    username: usernameInput.value,
    id: socket.id,
  };
  socket.emit('editUser', obj);
  usernameInput.value = '';
  return false;
});

socket.on('message', (message) => {
  const messageList = document.getElementById('messageList');
  const li = document.createElement('li');
  li.innerHTML = `<p data-testid="message">${message}</p>`;
  messageList.appendChild(li);
});

const addUser = ({ id, username }) => {
  const userList = document.getElementById('usersList');
  const li = document.createElement('li');
  li.innerHTML = `<p id="${id}" data-testid="online-user">${username}</p>`;
  userList.prepend(li);
};

socket.on('username', (user) => addUser(user));

socket.on('users', (users) => {
  users.forEach(addUser);
  socket.username = users[users.length - 1].username;
});

socket.on('editUser', ({ id, username }) => {
  const li = document.getElementById(id);
  li.innerText = username;
  socket.username = username;
});

socket.on('disconnectUser', (id) => {
  const user = document.getElementById(id);
  user.remove();
});