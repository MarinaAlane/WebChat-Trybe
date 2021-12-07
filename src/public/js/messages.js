const testIds = {
  onlineUser: '[data-testid="online-user"]',
  messageBox: '[data-testid="message-box"]',
  nickNameBox: '[data-testid="nickname-box"]',
  nickNameButton: '[data-testid="nickname-button"]',
  sendButton: '[data-testid="send-button"]',
};

const socket = window.io();

function randomNickNameUser() {
  const userNickName = document.querySelector(testIds.onlineUser);
  userNickName.innerText = Math.floor(Math.random() * 10 ** 16);
}

function renderMessageList(message) {
  const messagesUl = document.getElementById('messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;

  messagesUl.appendChild(li);
}

function sendNewMessage() {
  const nickname = document.querySelector(testIds.onlineUser).innerText;
  const chatMessage = document.querySelector(testIds.messageBox).value;
  socket.emit('message', { chatMessage, nickname });
  document.querySelector(testIds.messageBox).value = '';
}

function changeNickName() {
  const nickNameBox = document.querySelector(testIds.nickNameBox);
  const onlineUserNickName = document.querySelector(testIds.onlineUser);

  onlineUserNickName.innerText = nickNameBox.value;

  nickNameBox.value = '';
}

document.querySelector(testIds.nickNameButton).addEventListener('click', (e) => {
  e.preventDefault();
  changeNickName();
});

document.querySelector(testIds.sendButton).addEventListener('click', (e) => {
  e.preventDefault();
  sendNewMessage();
});

socket.on('message', (message) => {
  renderMessageList(message);
});

socket.on('loadMessages', (messages) => {
  document.getElementById('messages').innerHTML = '';
  messages.forEach(({ message, nickname, timestamp }) => {
    renderMessageList(`${timestamp} - ${nickname}: ${message}`);
  });
});

function loadMessages() {
  socket.emit('loadMessages');
}

/* Running function on page load: https://developer.mozilla.org/pt-BR/docs/Web/API/GlobalEventHandlers/onload */
window.onload = () => {
  randomNickNameUser();
  loadMessages();
};
