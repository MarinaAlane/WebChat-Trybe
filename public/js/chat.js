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
socket.emit('userOnline', { nickname: savedNick });

nicknameButton.addEventListener('click', (e) => {
  e.preventDefault();
  if (!nicknameInput.value) {
    return alert('digite um nickname!');
  }
  savedNick = nicknameInput.value;
  randomNickname.innerText = savedNick;
  console.log(savedNick);
  socket.emit('editUser', { nickname: savedNick, socketId: socket.id });
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
  
  const onlineUl = document.querySelector('#onlineUsers');
  const createOnlineUser = (nickname, socketId) => {
    const li = document.createElement('li');
    if (socket.id === socketId) return;
    li.setAttribute('data-testid', 'online-user');
    li.setAttribute('id', socketId);
    li.setAttribute('style', 'padding: 5px 10px;');
    li.innerText = nickname;
    onlineUl.appendChild(li); 
  };
  socket.on('message', (chatMessage) => createMessage(chatMessage)); 
  socket.on('userOnline', (allUsers) => { 
    onlineUl.innerHTML = '';
    allUsers.map((nickname) => createOnlineUser(nickname.nickname, nickname.socketId)); 
});

  window.onbeforeunload = function () {
    socket.disconnect();
  };

  socket.on('disconnectUser', (socketId) => {
    const user = document.getElementById(socketId);
    user.remove();
  });