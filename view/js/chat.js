const socket = window.io();

const btnSendMessage = document.querySelector('#sendMessage');
const inputMessage = document.querySelector('#messageInput');
const btnSaveNickname = document.querySelector('#saveNickname');
const nicknameInp = document.querySelector('#nicknameInput');
const currentNicknameSpan = document.querySelector('#online-user');


function randomNumber(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

let names = ['AJWNRPOITHNMLKJW', 'OWLKMNTKILOIWERN', 'LAOQIRJGMNASJELA'];
let random = randomNumber(0, names.length - 1);
let currentNickname = names[random];

//currentNicknameSpan.innerHTML = currentNickname;
socket.emit('newUserConnected', currentNickname);

const createMessage = (chatMessage) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.dataset.testid = "message";
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

socket.on('message', (chatMessage) => createMessage(chatMessage));
socket.on('allMessages', (allMessages) => {
  allMessages.forEach((message) => {
    createMessage(message)
  });
});
socket.on('allUsers', (usersList) => {
  // limpa elemento parent
  currentNicknameSpan.innerHTML = '';
  const lastUser = usersList[usersList.length -1];
  if(lastUser === currentNickname){
    usersList.pop();
    usersList.unshift(currentNickname);
  };
  // adiciona todos childs (li)
  usersList.forEach((user) => {
    const li = document.createElement('li');
    li.dataset.testid = "online-user";
    li.innerText = user;
    currentNicknameSpan.appendChild(li);
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
