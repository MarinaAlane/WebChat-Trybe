const socket = window.io();

const onlineUser = document.getElementById('online-user');

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', () => {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;

  onlineUser.innerText = username;

  sessionStorage.setItem('username', username);

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

socket.on('setUsername', (data) => {
  onlineUser.innerText = data;
  sessionStorage.setItem('username', data);
});

socket.on('message', (data) => {
  const messagesList = document.getElementById('messages-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = data;

  messagesList.appendChild(li);
});