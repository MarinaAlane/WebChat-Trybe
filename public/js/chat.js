const socket = window.io();

const messageForm = document.querySelector('#message-form');
const messageInput = document.querySelector('#message-input');
const messageList = document.querySelector('#message-list');

const nicknameForm = document.querySelector('#nickname-form');
const nicknameInput = document.querySelector('#nickname-input');

const usersList = document.querySelector('#users');

let nickname = '';
const testIdAttribute = 'data-testid';

const saveNicknameToStorage = (nick) => {
  sessionStorage.setItem('nicknameWebchat', nick);
};

const getNicknameFromStorage = () => sessionStorage.getItem('nicknameWebchat');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();

  socket.emit('message', {
    chatMessage: messageInput.value,
    nickname,
  });
  messageInput.value = '';
});

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  nickname = nicknameInput.value;
  saveNicknameToStorage(nicknameInput.value);

  socket.emit('updateNickname', nickname);
});

const addMessageToList = (msgContent) => {
  const newMsg = document.createElement('li');
  newMsg.innerHTML = msgContent;
  newMsg.setAttribute('data-testid', 'message');
  messageList.appendChild(newMsg);
};

const addUserToList = (nick, testid) => {
  const userElement = document.createElement('li');
  userElement.innerText = nick;
  userElement.setAttribute(testIdAttribute, testid);

  usersList.appendChild(userElement);
};

const renderUsersList = (users) => {
  usersList.innerHTML = '';

  const currentUser = users[socket.id];
  addUserToList(currentUser, 'online-user');

  const otherUsers = Object.keys(users).filter((userId) => userId !== socket.id);
  otherUsers.forEach((userId) => {
    addUserToList(users[userId], 'online-user');
  });
};

const renderMessages = (msgs) => {
  msgs.forEach((msg) => {
    const { message, nickname: nick, date } = msg;
    const newMsg = document.createElement('li');
    newMsg.innerText = `${date} - ${nick}: ${message}`;
    newMsg.setAttribute(testIdAttribute, 'message');

    messageList.appendChild(newMsg);
  });
};

socket.on('message', (msg) => {
  addMessageToList(msg);
});

socket.on('getNickname', (nick) => {
  const nickFromStorage = getNicknameFromStorage();
  if (!nickFromStorage) {
    saveNicknameToStorage(nick);
    nickname = nick;
  }
  nickname = nickFromStorage;

  socket.emit('updateNickname', nick);
});

socket.on('updateUsers', (users) => {
  renderUsersList(users);
});

socket.on('refreshMessages', (msgs) => {
  renderMessages(msgs);
}); 
