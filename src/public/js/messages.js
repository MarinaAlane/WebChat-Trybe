const testIds = {
  onlineUser: '[data-testid="online-user"]',
  messageBox: '[data-testid="message-box"]',
  nickNameBox: '[data-testid="nickname-box"]',
  nickNameButton: '[data-testid="nickname-button"]',
  sendButton: '[data-testid="send-button"]',
};

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
  const userNickName = document.querySelector(testIds.onlineUser).innerText;
  const messageBoxContent = document.querySelector(testIds.messageBox);
  renderMessageList(`${userNickName}: ${messageBoxContent.value}`);
  messageBoxContent.value = '';
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

/* Running function on page load: https://developer.mozilla.org/pt-BR/docs/Web/API/GlobalEventHandlers/onload */
window.onload = () => {
  randomNickNameUser();
};
