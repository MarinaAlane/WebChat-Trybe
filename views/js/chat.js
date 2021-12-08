const socket = window.io();

// adapted from => https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
const generateRandomId = (nicknameLength) => {
  let nickname = '';
  const characters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz';
  for (let index = 0; index < nicknameLength; index += 1) {
    nickname += characters.charAt(Math.floor(Math.random() * nicknameLength));
  }

  return nickname;
};

let nickname = generateRandomId(16);

const onlineUsersList = document.getElementById('online-users-list');
const sendMessageBtn = document.getElementById('send-btn');
const messageInput = document.getElementById('message-input');
const messagesList = document.getElementById('messages-list');
const changeNicknameBtn = document.getElementById('nickname-btn');
const nicknameInput = document.getElementById('nickname-input');

window.onload = () => {
  // const onlineUsers = document.createElement('li');
  // onlineUsers.innerText = nickname;
  // onlineUsers.dataset.testid = 'online-user';
  // onlineUsersList.appendChild(onlineUsers);
  socket.emit('newOnlineUser', nickname);
};

changeNicknameBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (nicknameInput.value !== '') {
    socket.emit('updateNickname', { 
      currentNickname: nickname,
      newNickname: nicknameInput.value, 
    });
    nickname = nicknameInput.value;
    nicknameInput.value = '';
  }
  return false;
});

sendMessageBtn.addEventListener('click', (e) => {
  e.preventDefault();
  if (messageInput.value !== '') {
    socket.emit('message', { 
      chatMessage: messageInput.value,
      nickname, 
    });
    messageInput.value = '';
  }
  return false;
});

const newMessage = (data) => {
  const li = document.createElement('li');
  li.innerText = data;
  li.dataset.testid = 'message';
  messagesList.appendChild(li);
};

const newOnlineUser = (onlineUsers) => {
  onlineUsersList.innerHTML = '';
  onlineUsers.forEach((user) => {
    const li = document.createElement('li');
    li.innerText = user;
    li.dataset.testid = 'online-user';
    onlineUsersList.appendChild(li);
    if (user === nickname) onlineUsersList.insertBefore(li, onlineUsersList.firstChild);
  });
};

socket.on('message', (data) => newMessage(data));
socket.on('newOnlineUser', (onlineUsers) => newOnlineUser(onlineUsers));
socket.on('userDisconnect', (onlineUsers) => newOnlineUser(onlineUsers));
socket.on('updateNickname', (onlineUsers) => newOnlineUser(onlineUsers));

window.onbeforeunload = () => {
  socket.emit('userDisconnect', nickname);
};
