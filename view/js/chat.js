const socket = window.io();

const btnSendMessage = document.querySelector('#sendMessage');
const inputMessage = document.querySelector('#messageInput');
const btnSaveNickname = document.querySelector('#saveNickname');
const nicknameInp = document.querySelector('#nicknameInput');
const onlineUserUl = document.querySelector('#online-user');

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const names = [
  'AAAAAAAAAAAAAAAA', 
  'BBBBBBBBBBBBBBBB', 
  'CCCCCCCCCCCCCCCC',
  'DDDDDDDDDDDDDDDD',
  'EEEEEEEEEEEEEEEE',
  'FFFFFFFFFFFFFFFF',
  'GGGGGGGGGGGGGGGG',
  'HHHHHHHHHHHHHHHH',
];

const random = randomNumber(0, names.length - 1);
let currentNickname = names[random];

const createMessage = (chatMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.dataset.testid = 'message';
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

function handleAllMessages(allMessages) {
  allMessages.forEach((message) => {
    createMessage(message);
  });
}

function handleAllUsers(usersList) {
  onlineUserUl.innerHTML = '';
  const lastUser = usersList[usersList.length - 1];
  if (lastUser === currentNickname) {
    usersList.pop();
    usersList.unshift(currentNickname);
  }
  usersList.forEach((user) => {
    const li = document.createElement('li');
    li.dataset.testid = 'online-user';
    li.innerText = user;
    onlineUserUl.appendChild(li);
  });
}

socket.on('connect', () => {
  socket.on('message', (chatMessage) => createMessage(chatMessage));
  socket.on('allMessages', (allMessages) => handleAllMessages(allMessages));
  socket.on('allUsers', (usersList) => {
    handleAllUsers(usersList);
  });
  btnSaveNickname.addEventListener('click', () => {
    currentNickname = nicknameInp.value;
    socket.emit('newNickname', currentNickname);
  });
  btnSendMessage.addEventListener('click', () => {
    socket.emit('message', {
      chatMessage: inputMessage.value,
      nickname: currentNickname,
    });
    inputMessage.value = '';
  });

  setTimeout(() => socket.emit('newUserConnected', currentNickname), 100);
});

socket.on('connect_error', (err) => {
  console.log(`connect_error due to ${err.message}`);
});