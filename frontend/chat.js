const socket = window.io();
const nicknameBtn = document.getElementById('nicknameBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const warningNickname = document.getElementById('warningNickname');
const messageInput = document.querySelector('#messageInput');
// let userID;
let nickname;

// socket.on('userID', (id) => { userID = id; });

const createLIitens = (text) => {
  const div = document.getElementsByClassName('messages-div')[0];
  const p = document.createElement('p');
  const attr = document.createAttribute('data-testid');
  attr.value = 'message';
  p.setAttributeNode(attr);
  p.innerText = text;
  div.appendChild(p);
};

nicknameBtn.addEventListener('click', (e) => {
  nickname = document.getElementById('nicknameInput').value;
  console.log('nick btn');
  messageInput.value = '';
  e.preventDefault();
});

sendMsgBtn.addEventListener('click', (e) => {
  e.preventDefault();
  
  // if (!nickname) {
  //   warningNickname.innerText = 'Fill your nickname';
  //   return false;
  // }
  
  socket.emit('message', {
    nickname,
    chatMessage: messageInput.value,
  });

    messageInput.value = '';
    return false;
});

socket.on('youLogged', (msg) => {
  createLIitens(msg);
});

socket.on('userLogged', (data) => { // We can also use socket.broadcast.emit (in serverSide) instead.
  // if (data.userID === userID) return;
  createLIitens(data.msg);
});

socket.on('message', (msg) => {
  createLIitens(msg);
});
