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

randomNickname.innerText = savedNick;

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!nicknameInput.value) {
    return alert('digite um nickname!');
  }
  savedNick = nicknameInput.value;
  randomNickname.innerText = savedNick;
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const messageInput = document.querySelector('#messageInput');
  const chatMessage = messageInput.value;
  messageInput.value = '';
  const nickname = savedNick;
  socket.emit('message', { chatMessage, nickname });
});

  const createMessage = (chatMessage) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.setAttribute('style', 'padding: 5px 10px;');
    li.innerText = chatMessage;
    messagesUl.appendChild(li);
  };
  
  socket.on('message', (chatMessage) => createMessage(chatMessage)); 