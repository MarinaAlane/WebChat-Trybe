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
  'HHHHHHHHHHHHHHHH'
];

const random = randomNumber(0, names.length - 1);
let currentNickname = names[random];

socket.on("connect", () => {
  console.log('connect', socket.id); 
  console.log('currentNickname: ', socket.id, currentNickname);
  
  // emitindo novo usuario
  socket.emit('newUserConnected', currentNickname);

  const createMessage = (chatMessage) => {
    const messagesUl = document.querySelector('#messages');
    const li = document.createElement('li');
    li.dataset.testid = 'message';
    li.innerText = chatMessage;
    messagesUl.appendChild(li);
  };

  socket.on('message', (chatMessage) => createMessage(chatMessage));

  socket.on('allMessages', (allMessages) => {
    allMessages.forEach((message) => {
      createMessage(message);
    });
  });

  socket.on('allUsers', (usersList) => {
    // limpa elemento parent
    onlineUserUl.innerHTML = '';
    const lastUser = usersList[usersList.length - 1];
    if (lastUser === currentNickname) {
      usersList.pop();
      usersList.unshift(currentNickname);
    }
    // adiciona todos childs (li)
    usersList.forEach((user) => {
      const li = document.createElement('li');
      li.dataset.testid = 'online-user';
      li.innerText = user;
      onlineUserUl.appendChild(li);
    });
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
});

