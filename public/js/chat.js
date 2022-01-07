const socket = window.io();
const form = document.querySelector('form');
const nicknameButton = document.querySelector('#saveButton');
const nicknameInput = document.querySelector('#nickNameInput');
const randomNickname = document.querySelector('#randomNickname');

const generateRandomString = (num) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result1 = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i += 1) {
    result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  
  return result1;
};

let savedNick = generateRandomString(16);

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  savedNick = nicknameInput.value;
  randomNickname.innerText = savedNick;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.querySelector('#messageInput');
  const message = messageInput.value;
  messageInput.value = '';
  const randomNick = generateRandomString(16);

  if (savedNick === '') {
    const nickname = randomNick;
    socket.emit('message', { chatMessage: message, nickname });
  } else {
  const nickname = nicknameInput.value;
  socket.emit('message', { chatMessage: message, nickname });
  }
});

randomNickname.innerText = savedNick;

  const createMessage = (chatMessage) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.setAttribute('style', 'padding: 5px 10px;');
    li.innerText = chatMessage;
    messagesUl.appendChild(li);
  };
  
  socket.on('message', (chatMessage) => createMessage(chatMessage)); 