const socket = window.io();
const nicknameBtn = document.getElementById('nicknameBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const messageInput = document.querySelector('#messageInput');

const randomStringGen = (length = 8) => { // Source: https://attacomsian.com/blog/javascript-generate-random-string
  // Declare all characters
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Pick characters randomly
  let str = '';
  for (let i = 0; i < length; i += 1) {
      str += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return str;
};

let nickname = randomStringGen(16);

const createLIitens = (text, dataTestid) => {
  const div = document.getElementsByClassName('messages-div')[0];
  const p = document.createElement('p');
  const attr = document.createAttribute('data-testid');
  attr.value = dataTestid;
  p.setAttributeNode(attr);
  p.innerText = text;
  div.appendChild(p);
};

nicknameBtn.addEventListener('click', (e) => {
  nickname = document.getElementById('nicknameInput').value;
  messageInput.value = '';
  e.preventDefault();
});

sendMsgBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  socket.emit('message', {
    nickname,
    chatMessage: messageInput.value,
  });

    messageInput.value = '';
    return false;
});

socket.on('youLogged', (msg) => {
  createLIitens(msg, 'message');
});

socket.emit('userLogged', nickname);

socket.on('userLogged', (nicknameRandom) => {
  createLIitens(nicknameRandom, 'online-user');
});

socket.on('message', (msg) => {
  createLIitens(msg, 'message');
});
