const socket = window.io('http://localhost:3000');

const formChat = document.querySelector('#form-chat');
const chat = document.querySelector('#chat-container');

const inputMessage = document.querySelector('#input-message');
const inputNickname = document.querySelector('#input-nickname');

const onlineUser = document.querySelector('#online-user');
const submitNickname = document.querySelector('#submit-nickname');

const nicknamesList = document.querySelector('#online-users');

let nick;

const newElement = (element) => document.createElement(element);

const createSection = (className) => {
  const section = newElement('section');
  section.className = className;
  return section;
};

// const createAvatar = (className, src) => {
//   const avatar = newElement('img');
//   avatar.alt = 'Avatar';
//   avatar.src = src;
//   avatar.className = className;
//   return avatar;
// };

const createParagraph = (msg) => {
  const newMessage = newElement('p');
  newMessage.setAttribute('data-testid', 'message');
  newMessage.innerText = msg;
  return newMessage;
};

const createMsgContainer = (msg) => {
  const newMessage = createParagraph(msg);
  // const avatar = createAvatar('avatar', '../images/avatar1.png');
  const section = createSection('message-div');
  section.append(newMessage);
  chat.append(section);
};

formChat.addEventListener('submit', (e) => {
  e.preventDefault();
  if (inputMessage.value) {
    socket.emit('message', { chatMessage: inputMessage.value, nickname: nick });
    inputMessage.value = '';
    inputMessage.focus();
  }
});

const setNewNickname = () => {
  if (inputNickname.value) nick = inputNickname.value;
  onlineUser.innerText = nick;
  inputNickname.value = '';
  socket.emit('changeNickname', nick);
};

submitNickname.setAttribute('onlick', setNewNickname);

const createNickList = (nicknames) => {
  nicknames.forEach((nickname) => {
    const newLi = newElement('li');
    newLi.setAttribute('data-testid', 'online-user');
    newLi.innerText = nickname;
    nicknamesList.appendChild(newLi);
  });
};

socket.on('connect', () => {
  nick = (socket.id).substr(0, 16).toLowerCase();
  onlineUser.innerText = nick;
  socket.emit('user', nick);
});

socket.on('message', (msg) => {
  createMsgContainer(msg);
  window.scrollTo(0, document.body.scrollHeight);
});

socket.on('user', (nicknames) => {
  nicknamesList.innerText = '';
  createNickList(nicknames);
});

socket.on('disconnected', (nicknames) => {
  nicknamesList.innerText = '';
  createNickList(nicknames);
});

socket.on('changeNickname', (nicknames) => {
  console.log(nicknames);
  nicknamesList.innerText = '';
  createNickList(nicknames);
});
