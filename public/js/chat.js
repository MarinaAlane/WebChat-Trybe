const socket = window.io();

let nickname;

const setNickname = (nicknameData = '') => {
  const nicknameTag = document.querySelector('.online-user');
  nickname = nicknameData;

  nicknameTag.innerHTML = nicknameData;
};

const generateNickname = () => Math.random().toFixed(16).toString(16).slice(2);

window.onload = () => {
  setNickname(generateNickname());
};

const sendMessage = (e) => {
  e.preventDefault();
  const chatInput = document.querySelector('#chat-input');

  socket.emit('message', { 
    chatMessage: chatInput.value, 
    nickname, 
  });

  chatInput.value = '';
};

const createMessageText = (message, userName) => {
  const text = document.createElement('p');
  text.innerHTML = `${userName} - ${message}`;
  text.setAttribute('data-testid', 'message');
  
  return text;
};

document.querySelector('.nickname-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const nicknameInput = e.target.querySelector('input');

  setNickname(nicknameInput.value);

  nicknameInput.value = '';
});

document.querySelector('#chat-form').addEventListener('submit', sendMessage);

const displayMessage = (data) => {
  const { message, nickname: userName } = JSON.parse(data);
  const messagesContainer = document.querySelector('.messages-container');

  const messageBox = document.createElement('li');
  messageBox.appendChild(createMessageText(message, userName));

  messagesContainer.appendChild(messageBox);
};

socket.on('message', displayMessage);