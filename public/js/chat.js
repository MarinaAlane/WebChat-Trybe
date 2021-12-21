const socket = window.io();

const saveBtn = document.getElementById('save-btn');
saveBtn.addEventListener('click', () => {
  const usernameInput = document.getElementById('username-input');
  const username = usernameInput.value;

  const onlineUser = document.getElementById('online-user');
  onlineUser.innerText = username;

  sessionStorage.setItem('username', username);

  usernameInput.value = '';
});

const sendBtn = document.getElementById('send-btn');
sendBtn.addEventListener('click', () => {
  const username = sessionStorage.getItem('username');
  const messageInput = document.getElementById('message-input');

  const newMessage = {
    chatMessage: messageInput.value,
    nickname: username,   
  };
  socket.emit('sendMessage', newMessage);

  messageInput.value = '';
});
