const socket = window.io();

const nickName = document.getElementById('nickname-box');
const messageBox = document.getElementById('message-box');
const buttonMessage = document.getElementById('send-message');
const listMessage = document.getElementById('list-message');
const listUserOnline = document.getElementById('list-online-user');
const getNickNameValue = document.getElementById('nickname-box');
const buttonSetNickName = document.getElementById('nickname-button');

const getNickName = window.sessionStorage.getItem('nickname');

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
    nickname: getNickName !== null ? getNickName : nickName.value,
    chatMessage: messageBox.value,
  });
});

buttonSetNickName.addEventListener('click', (event) => {
  event.preventDefault();
  window.sessionStorage.setItem('nickname', getNickNameValue.value);
});

socket.on('message', async (renderMessage) => {
  creatMessage(renderMessage);
});

socket.on('userOnline', (randName) => {
  console.log(getNickName);
  if (!getNickName) {
    window.sessionStorage.setItem('nickname', randName);
    setUserOn(randName);
  } else {
    setUserOn(getNickName);
  }
});
