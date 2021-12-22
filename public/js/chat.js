const socket = window.io();

// Ref: https://www.codegrepper.com/code-examples/javascript/generate+unique+username+in+JavaScript
const randomNickname = () => {
  const randomEightChar = Math.random().toString(36).substr(2, 8);
  return randomEightChar + randomEightChar;
};

const onlineUser = document.getElementById('online-user');
onlineUser.innerText = randomNickname();

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
  socket.emit('sendMessage', newMessage);

  messageInput.value = '';
});

socket.on('sendMessage', (data) => {
  const messagesList = document.getElementById('messages-list');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = data;

  messagesList.appendChild(li);
});