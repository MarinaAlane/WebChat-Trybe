const socket = window.io();
const nicknameBtn = document.getElementById('nicknameBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const messageInput = document.querySelector('#messageInput');

const CLASSNAME__MESSAGE_DIV = 'messages-div';
const CLASSNAME__ONLINE_USERS_DIV = 'online-users-div';

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

socket.emit('nickname', nickname); // estou aqui

const createChatList = (text, dataTestid, classNameFather) => {
  const div = document.getElementsByClassName(classNameFather)[0];
  const p = document.createElement('p');
  const attr = document.createAttribute('data-testid');
  attr.value = dataTestid;
  p.setAttributeNode(attr);
  p.innerText = text;
  div.appendChild(p);
};

const createUsersList = (users, dataTestid, classNameFather) => {
  const div = document.getElementsByClassName(classNameFather)[0];
  const p = document.createElement('p');
  const attr = document.createAttribute('data-testid');
  attr.value = dataTestid;
  p.setAttributeNode(attr);

  users.forEach((user) => {
    p.innerText = user.nickName;
    div.appendChild(p);
  });
};

createChatList(nickname, 'online-user', CLASSNAME__MESSAGE_DIV);

nicknameBtn.addEventListener('click', (e) => {
  nickname = document.getElementById('nicknameInput').value;
  // socket.emit('alterNickname', alteredNickname);
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

// socket.on('youLogged', (msg) => {
//   createChatList(msg, 'message', CLASSNAME__MESSAGE_DIV);
// });

// socket.on('login', (nickname) => {
// });

socket.on('allLoggedUsers', (onlineUsers) => {
  // createChatList(data.nickname, 'online-user', CLASSNAME__MESSAGE_DIV);
  createUsersList(onlineUsers, 'online-user', CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('message', (msg) => {
  createChatList(msg, 'message', CLASSNAME__MESSAGE_DIV);
});
