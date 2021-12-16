const socket = window.io();

const formMessages = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#messageInput');
const formNickname = document.querySelector('#form-nickname');
const inputNickname = document.querySelector('#nicknameInput');
const messagesUl = document.querySelector('#messages');
const usersListUl = document.querySelector('#online-users');

let usersListClient = [];

// SESSION STORAGE FUNCTION
const setNicknameIntoSessionStorage = (nickname) => sessionStorage.setItem('nickname', nickname);
const getNicknameFromSessionStorage = () => sessionStorage.nickname || (socket.id).substr(4);
const setInitialNicknameIntoSessionStorage = () => {
  if (typeof socket.id === 'string') {
    const nicknameToSet = (socket.id).substr(4);
    setNicknameIntoSessionStorage(nicknameToSet);
  }
};

// HTML FUNCTIONS
const createServerMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createChatMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

const createUserLi = (nickname) => {
  const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = nickname;
    usersListUl.appendChild(li);
};

const renderUsersList = () => {
  usersListUl.innerHTML = '';
  const clientNickname = getNicknameFromSessionStorage();
  createUserLi(clientNickname);
  usersListClient.forEach((nickname) => {
    if (clientNickname !== nickname) {
      createUserLi(nickname);
    }
  });
};

// NORMAL FUNCTIONS
const sendUsersListToServer = () => {
  socket.emit('usersListFromClient', usersListClient);
};

const addNewUserToList = (newUser) => {
  usersListClient.push(newUser);
  renderUsersList();
  sendUsersListToServer();
};

const updateListWithAllUsers = (usersListFromServer) => {
  if (usersListFromServer.length > usersListClient.length) {
    usersListClient = usersListFromServer;
    renderUsersList();
  }
};

const updateNicknameAndSendToServer = () => {
  const previusNickname = getNicknameFromSessionStorage();
  const newNickname = inputNickname.value;
  const nicknameIndex = usersListClient.indexOf(previusNickname);
  console.log(usersListClient);
  console.log(previusNickname);
  usersListClient[nicknameIndex] = newNickname;
  setNicknameIntoSessionStorage(newNickname);
  socket.emit('updateNickname', newNickname);
  inputNickname.value = '';
  renderUsersList();
};

const updateNicknameFromServer = ({ previusNickname, newNickname }) => {
  const nicknameIndex = usersListClient.indexOf(previusNickname);
  usersListClient[nicknameIndex] = newNickname;
  renderUsersList();
};

const removeNicknameFromServer = (nickname) => {
  const nicknameIndex = usersListClient.indexOf(nickname);
  usersListClient.splice(nicknameIndex, 1);
  renderUsersList();
};

const requestMessagesToLoad = () => {
  socket.emit('getMessagesFromDB');
};

const loadDBMessages = (messages) => {
  messages.forEach((document) => {
    const { message, nickname, timestamp } = document;
    const formatedMessage = `${timestamp} - ${nickname}: ${message}`;
    createChatMessage(formatedMessage);
  });
};

// LISTENNERS FUNCTIONS
formMessages.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = getNicknameFromSessionStorage();
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
  return null;
});

formNickname.addEventListener('submit', (e) => {
  e.preventDefault();
  updateNicknameAndSendToServer();
  return null;
});

socket.on('serverMessage', (messageData) => createServerMessage(messageData));
socket.on('message', (messageData) => createChatMessage(messageData));
socket.on('newUser', (usersListFromServer) => addNewUserToList(usersListFromServer));
socket.on('listWithAllUsers', (usersListFromServer) => updateListWithAllUsers(usersListFromServer));
socket.on('updateNickname', (nicknameToUpdateData) => {
  updateNicknameFromServer(nicknameToUpdateData);
});
socket.on('removeNickname', (nicknameToRemove) => removeNicknameFromServer(nicknameToRemove));
socket.on('messagesToLoad', (messages) => loadDBMessages(messages));

window.onload = () => {
  setInitialNicknameIntoSessionStorage();
  requestMessagesToLoad();
};
