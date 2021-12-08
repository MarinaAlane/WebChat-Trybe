const socket = window.io();

const nickName = document.getElementById('nickname-box');
const messageBox = document.getElementById('message-box');
const buttonMessage = document.getElementById('send-message');
const listMessage = document.getElementById('list-message');
const listUserOnline = document.getElementById('list-online-user');

function creatMessage(message) {
  const itemListElement = document.createElement('li');
  itemListElement.innerText = message;
  itemListElement.setAttribute('data-testid', 'message');
  listMessage.appendChild(itemListElement);
}

function setUserOn(nickNameUser) {
  const itemListElement = document.createElement('li');
  itemListElement.innerText = nickNameUser;
  itemListElement.setAttribute('data-testid', 'online-user');
  listUserOnline.appendChild(itemListElement);
}

buttonMessage.addEventListener('click', (event) => {
  event.preventDefault();

  socket.emit('message', {
    nickname: nickName.value,
    chatMessage: messageBox.value,
  });
});

socket.on('message', async (renderMessage) => {
  creatMessage(renderMessage);
});

socket.on('userOnline', (randName) => {
  setUserOn(randName);
});
