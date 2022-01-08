const socket = window.io();
const nicknameBtn = document.getElementById('nicknameBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const messageInput = document.querySelector('#messageInput');

const CLASSNAME__MESSAGE_DIV = 'messages-div';
const CLASSNAME__ONLINE_USERS_DIV = 'online-users-div';
const DATATESTID__ONLINE_USER = 'online-user';

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
// const onlineUsers = [];

socket.emit('login', nickname);

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
  users.forEach((user) => {
    const div = document.getElementsByClassName(classNameFather)[0];
    const p = document.createElement('p');
    const attr = document.createAttribute('data-testid');
    attr.value = dataTestid;
    p.setAttributeNode(attr);
    p.innerText = `${user.nickname}`;
    div.appendChild(p);
  });
};

const updateUsersList = (_text = null, _dataTestid, classNameFather) => {
  const div = document.getElementsByClassName(classNameFather)[0];
  div.innerHTML = ''; 
  // users.forEach((user) => {
  //   const p = document.createElement('p');
  //   const attr = document.createAttribute('data-testid');
  //   attr.value = dataTestid;
  //   p.setAttributeNode(attr);
  //   div.appendChild(p);
  // });
};

const addUserToList = (userNickname, dataTestid, classNameFather) => {
  const div = document.getElementsByClassName(classNameFather)[0];

  // debug
  console.log('FRONT: div');
  console.log(div);

  const p = document.createElement('p');
  const attr = document.createAttribute('data-testid');
  attr.value = dataTestid;
  p.setAttributeNode(attr);
  p.innerText = `${userNickname}`;
  div.appendChild(p);
};

// addUserToList(nickname, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);

// createChatList(nickname, DATATESTID__ONLINE_USER, CLASSNAME__MESSAGE_DIV);

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

socket.on('serverReturnAfterLogin', (data) => {
  const { onlineUsers } = data;
  const newUsersArray = onlineUsers;
  newUsersArray.unshift({ socketId: socket.id, nickname });

  createUsersList(newUsersArray, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('otherUserConnected', (userNickname) => {
  addUserToList(userNickname, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('otherUserDisconnected', (_data) => {
  updateUsersList(null, null, CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('message', (msg) => {
  createChatList(msg, 'message', CLASSNAME__MESSAGE_DIV);
});
