const socket = window.io();
// const moment = window.moment();

const formSendMessage = document.querySelector('#form-chatMessage');

function sendMessage(event) {
  event.preventDefault();

  const chatMessage = document.querySelector('input[name=chatMessage');
  const nicknameInput = document.querySelector('input[name=nickname');

  socket.emit('message', {
    chatMessage: chatMessage.value,
    nickname: nicknameInput.value,
  });

  chatMessage.value = '';
  nicknameInput.value = '';
}

function reciveMessage(msg) {
  const li = document.createElement('li');
  const message = document.createTextNode(`${msg}`);
  li.append(message);

  const webchatList = document.querySelector('#webchat');
  webchatList.appendChild(li);
}

function saveNickname(nickname) {
  const li = document.createElement('li');
  li.append(nickname);

  const connectionsList = document.querySelector('#connections-list');
  connectionsList.appendChild(li);
}

formSendMessage.addEventListener('submit', sendMessage);

socket.on('message', (msg) => {
  console.log('message socket.on acionada (chat.js)', msg);
  reciveMessage(msg);
});

socket.on('nickname', (nickname) => {
  console.log('nickname socket.on acionada (chat.js)', nickname);
  saveNickname(nickname);
});