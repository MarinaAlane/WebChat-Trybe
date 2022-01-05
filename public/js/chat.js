const socket = window.io();

const formMessage = document.getElementById('form-messages');
const inputMessage = document.getElementById('messageInput');
const inputNickname = document.getElementById('input-nickname');
const formNickname = document.getElementById('form-user');
const spanNickname = document.querySelector('span');

const setNickname = (nickname) => sessionStorage.setItem('nickname', nickname);
const getNickname = () => sessionStorage.nickname;

// source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const generateRandomNickname = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i += 1) {
      result += characters.charAt(Math.floor(Math.random() 
 * charactersLength));
   }
   return result;
};

const setRandomNickname = () => {
  setNickname(generateRandomNickname(16));
  document.querySelector('span').innerHTML = getNickname();
};

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  setNickname(inputNickname.value);
  spanNickname.innerText = inputNickname.value;
  socket.emit('user', inputNickname.value);
  inputNickname.value = ''; 
});

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  const newMessage = {
    chatMessage: inputMessage.value,
    nickname: getNickname(),
  };
  socket.emit('message', newMessage);
  inputMessage.value = ''; 
});

const createMessage = (message) => {
  const messagesUl = document.getElementById('chat');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const loadMessages = (history) => {
  history.forEach(({ message, nickname, timestamp }) => {
    const newMessage = `${timestamp} - ${nickname}: ${message}`;
    createMessage(newMessage);
  });
};

const loadHistoryMessagesFromDB = () => {
  socket.emit('load');
  socket.on('loadHistory', (history) => loadMessages(history));
};

socket.on('message', (message) => createMessage(message));

window.onload = () => {
  setRandomNickname();
  loadHistoryMessagesFromDB();
};
