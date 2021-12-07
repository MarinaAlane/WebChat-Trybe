const socket = window.io();

const nickName = document.getElementById('nickname-box');
const messageBox = document.getElementById('message-box');
const buttonMessage = document.getElementById('send-message');
const listMessage = document.getElementById('list-message');

buttonMessage.addEventListener('click', (event) => {
  event.preventDefault();

  socket.emit('message', {
    nickname: nickName.value,
    chatMessage: messageBox.value,
  });
});

socket.on('message', async (renderMessage) => {
  const itemListElement = document.createElement('li');
  itemListElement.innerText = renderMessage;
  itemListElement.setAttribute('data-testid', 'message');
  listMessage.appendChild(itemListElement);
});
