const socket = window.io();
const nicknameBtn = document.getElementById('nicknameBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const messageInput = document.querySelector('#messageInput');

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

let nickname = randomStringGen(16);
// const onlineUsers = [];

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
  const div = document.getElementsByClassName(classNameFather)[0];
  users.forEach((user) => {
    const p = document.createElement('p');
    const attr = document.createAttribute(DATA_TESTID);
    attr.value = dataTestid;
    p.setAttributeNode(attr);
    p.innerText = `${user.nickname}`;
    div.appendChild(p);
  });
};

const updateUsersList = (updatedUsersList, dataTestid, classNameFather) => {
  let div = document.getElementsByClassName(classNameFather)[0];
  // let ul = document.querySelector(`.${classNameFather}`);
  // div.innerHTML = '';
  // div.innerHTML = '';

  // if (div.length !== 0) {
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }

    // while (ul.hasChildNodes()) {  
    //   ul.removeChild(ul.firstChild);

    //   console.log('Entrou no while');
    // }

  // }

  console.log('FRONT: array que chega p atualizar');
  console.log(updatedUsersList);

  updatedUsersList.forEach((user) => {
      console.log('entrou no forEach');
      const p = document.createElement('p');
      // const li = document.createElement('li');
      const attr = document.createAttribute(DATA_TESTID);
      attr.value = dataTestid;
      // p.innerText = `${user.nickname}`;
      // li.textContent = `${user.nickname}`;
      // ul.appendChild(li);
      p.textContent = `${user.nickname}`;
      div.appendChild(p);
    });
};

const addUserToList = (userNickname, dataTestid, classNameFather) => {
  const div = document.getElementsByClassName(classNameFather)[0];

  // debug
  console.log('FRONT: div');
  console.log(div);

  const p = document.createElement('p');
  const attr = document.createAttribute(DATA_TESTID);
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

// socket.on('serverReturnAfterLogin', (data) => {
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
        // debug
        console.log('FRONT: onlineUsers ANTES do splice');
        console.log(newUsersArray);
  updateUsersList(newUsersArray, DATATESTID__ONLINE_USER, CLASSNAME__ONLINE_USERS_DIV);
      // debug
      console.log('FRONT: newUsersArray DEPOIS do splice');
      console.log(newUsersArray);
});

socket.on('message', (msg) => {
  createChatList(msg, 'message', CLASSNAME__MESSAGE_DIV);
});
