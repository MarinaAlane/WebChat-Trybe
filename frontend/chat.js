const socket = window.io();
const nicknameBtn = document.getElementById('nicknameBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameBtn');

const CLASSNAME__MESSAGE_DIV = 'messages-div';
const CLASSNAME__ONLINE_USERS_DIV = 'online-users-div';
const DATATESTID__ONLINE_USER = 'online-user';
const DATA_TESTID = 'data-testid';

window.onbeforeunload = (_event) => {
  socket.disconnect();
};

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

// let nickname = randomStringGen(16);
const nickname = randomStringGen(16);

let newUsersArray = [];

socket.emit('login', nickname);

const createChatList = (text, dataTestid, classNameFather) => {
  const p = document.createElement('p');
  const div = document.getElementsByClassName(classNameFather)[0];
  const attr = document.createAttribute(DATA_TESTID);
  attr.value = dataTestid;
  p.setAttributeNode(attr);
  p.innerText = text;
  div.appendChild(p);
};

const createUsersList = (users, dataTestid, classNameFather) => {
  const ul = document.querySelector(`.${classNameFather}`);

  users.forEach((user) => {
    const li = document.createElement('li');
    const attr = document.createAttribute(DATA_TESTID);
    attr.value = dataTestid;
    li.setAttributeNode(attr);
    li.textContent = `${user.nickname}`;
    ul.appendChild(li);
  });
};

const updateUsersList = (updatedUsersList, dataTestid, classNameFather) => {
  const ul = document.querySelector(`.${classNameFather}`);

    while (ul.hasChildNodes()) {  
      ul.removeChild(ul.firstChild);
    }

  console.log('FRONT: array que chega p atualizar');
  console.log(updatedUsersList);

  updatedUsersList.forEach((user) => {
      console.log('entrou no forEach');
      const li = document.createElement('li');
      const attr = document.createAttribute(DATA_TESTID);
      attr.value = dataTestid;
      li.setAttributeNode(attr);
      li.textContent = `${user.nickname}`;
      ul.appendChild(li);
    });
};

const addUserToList = (userNickname, dataTestid, classNameFather) => {
  const ul = document.querySelector(`.${classNameFather}`);

  const li = document.createElement('li');
  const attr = document.createAttribute(DATA_TESTID);
  attr.value = dataTestid;
  li.setAttributeNode(attr);
  li.innerText = `${userNickname}`;
  ul.appendChild(li);
};

nicknameBtn.addEventListener('click', (e) => {
  // nickname = document.getElementById('nicknameInput').value;
  // socket.emit('alterNickname', nickname);

  const newNickname = document.getElementById('nicknameInput').value;
  socket.emit('alterNickname', newNickname);
  nicknameInput.value = '';
  e.preventDefault();
});

socket.on('alterNickname', (onlineUsers) => {
  newUsersArray = [];
  newUsersArray = [...onlineUsers];
  updateUsersList(newUsersArray, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
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

  socket.on('login', (data) => {
  const { onlineUsers } = data;
  newUsersArray = onlineUsers;
  newUsersArray.unshift({ socketId: socket.id, nickname });

  createUsersList(newUsersArray, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('otherUserConnected', (userNickname) => {
  addUserToList(userNickname, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('otherUserDisconnected', (data) => {
  const { onlineUsers } = data;
  newUsersArray = [];
  newUsersArray = [...onlineUsers];
  updateUsersList(newUsersArray, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
});

socket.on('message', (msg) => {
  createChatList(msg, 'message', CLASSNAME__MESSAGE_DIV);
});
