const socket = window.io();

let nickname;

const userList = {};

const setNickname = (nicknameData = '') => {
  const nicknameTag = document.querySelector('.online-user');
  nickname = nicknameData;
  nicknameTag.id = socket.id;
  nicknameTag.innerHTML = nicknameData;

  socket.emit('newClient', { username: nickname });
};

const generateNickname = () => Math.random().toFixed(16).toString(16).slice(2);

const sendMessage = (e) => {
  e.preventDefault();
  const chatInput = document.querySelector('#chat-input');

  socket.emit('message', { 
    chatMessage: chatInput.value, 
    nickname, 
  });

  chatInput.value = '';
};

const createMessageText = (message, userName) => {
  const text = document.createElement('p');
  text.innerHTML = `${userName} - ${message}`;
  text.setAttribute('data-testid', 'message');
  
  return text;
};

const displayMessage = (data) => {
  const { message, nickname: userName } = JSON.parse(data);
  const messagesContainer = document.querySelector('.messages-container');

  const messageBox = document.createElement('li');
  messageBox.appendChild(createMessageText(message, userName));

  messagesContainer.appendChild(messageBox);
};

const displayMessageHistory = (history) => {
  history.forEach((messageData) => displayMessage(JSON.stringify(messageData)));
};

const createContact = ({ id, username }) => {
  const li = document.createElement('li');
  const img = document.createElement('img');
  const p = document.createElement('p');

  li.className = 'user';
  li.id = `li_${id}`;
  p.id = id;
  p.setAttribute('data-testid', 'online-user');
  p.innerHTML = username;
  img.setAttribute('src', 'https://i.pravatar.cc/54');
  img.setAttribute('alt', `foto da pessoa usuaria ${username}`);

  li.appendChild(img);
  li.appendChild(p);

  return li;
};

const displayNewContact = (data) => {
  const { username, id } = data;
  const contact = createContact({ id, username });
  const list = document.getElementById('online-users');

  list.appendChild(contact);
};

const removeContact = (contactId) => {
  const contact = document.getElementById(`li_${contactId}`);

  if (!contact) return;

  delete userList[contactId];
  const contactList = document.querySelector('#online-users');
  contactList.removeChild(contact);
};

const serializeContact = ({ id, innerHTML: username }) => ({ [id]: {
      id,
      username,
    },
  });
  
const joinObjects = (acc, crr) => Object.assign(acc, crr);

const getUserList = () => {
  const data = document.querySelectorAll('[data-testid=online-user]');
  const users = [...data]
    .map(serializeContact)
    .reduce(joinObjects, {});
  
  return users;
};

const cleanOnlineUsers = () => {
  const onlineUsers = document.querySelector('#online-users');

  onlineUsers.innerHTML = '';
};

const updateOnlineUsers = (data) => {
  Object.assign(userList, data);
  const onlineUsers = Object.values(userList);
  cleanOnlineUsers();

  onlineUsers.forEach(({ id, username }) => {
    if (id === socket.id) return;
    displayNewContact({ id, username });
  });
};

socket.on('message', displayMessage);
socket.on('messagesHistory', displayMessageHistory);
socket.on('newClient', (data) => {
  displayNewContact(data);
  socket.emit('userList', getUserList());
});
socket.on('clientDisconnect', removeContact);
socket.on('updateUserList', updateOnlineUsers);

window.onload = () => {
  setNickname(generateNickname());
  document.querySelector('.nickname-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const nicknameInput = e.target.querySelector('input');
  
    setNickname(nicknameInput.value);
  
    nicknameInput.value = '';
  });
  document.querySelector('#chat-form').addEventListener('submit', sendMessage);
};
