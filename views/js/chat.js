const socket = window.io();

const nickName = document.getElementById('nickname-box');
const messageBox = document.getElementById('message-box');
const buttonMessage = document.getElementById('send-message');
const listMessage = document.getElementById('list-message');
const listUserOnline = document.getElementById('list-online-user');
const inputSetNick = document.getElementById('nickname-box');
const buttonSetNickName = document.getElementById('nickname-button');

function creatMessage(message) {
  const itemListElement = document.createElement('li');
  itemListElement.innerText = message;
  itemListElement.setAttribute('data-testid', 'message');
  listMessage.appendChild(itemListElement);
}

function setUserOn(id, nickNameUser) {
  const itemListElement = document.createElement('li');
  itemListElement.innerText = nickNameUser;
  itemListElement.setAttribute('id', id);
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

buttonSetNickName.addEventListener('click', (event) => {
  event.preventDefault();
  window.sessionStorage.setItem('nickname', inputSetNick.value);
  socket.emit('changeNickName', nickName.value);
  console.log(listUserOnline);
});

socket.on('message', async (renderMessage) => {
  creatMessage(renderMessage);
});

socket.emit('usersOnline');

socket.on('usersOnline', ({ section, userNickName }) => {
  setUserOn(section, userNickName);
});

socket.on('setUsersOnlineMe', ({ arrayUsersOnline, randNameId }) => {
  console.log(arrayUsersOnline, randNameId);
  arrayUsersOnline.forEach(({ section, userNickName }) => {
    if (section !== randNameId) {
      setUserOn(section, userNickName);
    }
  });
});

function updateUser(id, nickNameUser) {
  const getUserId = document.getElementById(id);
  getUserId.innerText = nickNameUser;
}

socket.on('changerUser', ({ randNameId, nickname }) => {
  updateUser(randNameId, nickname);
});

function removeUser(id) {
  const getUserId = document.getElementById(id);
  getUserId.remove();
}

socket.on('removeuserOnline', ({ randNameId }) => {
  removeUser(randNameId);
});
