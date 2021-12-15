const socket = window.io();

// PAGE ELEMENTS

const nicknameList = document.querySelector('#online-list');
const nicknameBox = document.querySelector('#nickname-box');
const nicknameButton = document.querySelector('#nickname-button');

const messageList = document.querySelector('#message-list');
const sendButton = document.querySelector('#send-button');
const messageBox = document.querySelector('#message-box');

// HELP FUNCTIONS

const createLi = (nickname, user) => {
  const li = document.createElement('li');
  li.innerHTML = nickname;
  li.className = user;
  return li;
};

const createUser = (nickname, user) => {
  const nicknameHTML = createLi(nickname, user);
  nicknameHTML.setAttribute('data-testid', 'online-user');
  nicknameList.appendChild(nicknameHTML);
};

const updateUser = (nickname, user) => {
  const userTag = document.querySelector(`.${user}`);
  userTag.innerHTML = nickname;
};  

const createMessage = (chatMessage) => {
  const li = document.createElement('li');

  li.className = 'message';
  li.setAttribute('data-testid', 'message');
  li.innerHTML = chatMessage;

  messageList.appendChild(li);
  return false;
};

// RENDER CHAT HISTORY

socket.on('getChatData', (data) => {
  data.forEach(({ message, nickname, timestamp }) => {
    const fullMessage = `${timestamp} - ${nickname}: ${message}`;
    createMessage(fullMessage);
  });
});

// ENTER CHAT

socket.on('enterChat', (onlineUsers) => {
  sessionStorage.clear();
  const user = `_${socket.id.substring(0, 15)}`;
  sessionStorage.setItem(user, user);
  createUser(user, user);
  socket.emit('addOnlineUser', user);

  onlineUsers.forEach((onlineUser) => {
    if (onlineUser.user !== user) {
      createUser(onlineUser.nickname, onlineUser.user);
    }
  });
});

// NICKNAME CREATING

socket.on('addOnlineUser', (user) => {
  createUser(user, user);
});

// NICKNAME UPDATE

nicknameButton.addEventListener('click', () => {
  const newNickname = nicknameBox.value;
  const user = `_${socket.id.substring(0, 15)}`; 
  socket.emit('updateNickname', { user, newNickname });
  return false;
});

socket.on('updateNickname', ({ user, newNickname }) => {
  sessionStorage.setItem(user, newNickname);
  updateUser(newNickname, user);
});

// MESSAGE CREATING

sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const user = `_${socket.id.substring(0, 15)}`; 
  const nickname = sessionStorage.getItem(user);
  const chatMessage = messageBox.value;
  messageBox.value = '';

  socket.emit('message', { chatMessage, nickname });
});

socket.on('message', (chatMessage) => {
  createMessage(chatMessage);
});

// LEAVE CHAT

const deleteUser = (user) => {
  const userOnline = document.querySelector(`.${user}`);
  nicknameList.removeChild(userOnline);
  sessionStorage.removeItem(user);
};

socket.on('leaveChat', (user) => {
  deleteUser(user);
});
