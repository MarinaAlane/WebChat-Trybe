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

function updateUser(id, nickNameUser) {
  const getUserId = document.getElementById(id);
  getUserId.innerText = nickNameUser;
}

function removeUser(id) {
  const getUserId = document.getElementById(id);
  getUserId.remove();
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
  socket.emit('changeNickName', inputSetNick.value);
});

socket.on('message', async (renderMessage) => {
  creatMessage(renderMessage);
});

socket.on('usersOnline', ({ section, userNickName }) => {
  setUserOn(section, userNickName);
});

socket.on('setmeOnline', ({ arrayUsersOnline, idsectionUser }) => {
  arrayUsersOnline.forEach(({ section, userNickName }) => {
    if (section !== idsectionUser) {
      setUserOn(section, userNickName);
    }
  });
});

socket.on('changerUser', ({ idsectionUser, nickname }) => {
  updateUser(idsectionUser, nickname);
});

socket.on('disconnectUser', ({ idsectionUser }) => {
  removeUser(idsectionUser);
});
