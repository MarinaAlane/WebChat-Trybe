const socket = window.io();

const btnSendMessage = document.querySelector('#sendMessage');
const inputMessage = document.querySelector('#messageInput');
const btnSaveNickname = document.querySelector('#saveNickname');
const nicknameInp = document.querySelector('#nicknameInput');

let currentNickname = 'Sem nome';

btnSaveNickname.addEventListener('click', () => {
  currentNickname = nicknameInp.value;
});

btnSendMessage.addEventListener('click', () => {
  socket.emit('message', {
    chatMessage: inputMessage.value,
    nickname: currentNickname,
  });
  inputMessage.value = '';
});

const createMessage = (chatMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));
