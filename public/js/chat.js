const socket = window.io('http://localhost:3000');

const formChat = document.querySelector('#form-chat');
const chat = document.querySelector('#chat-container');

const inputMessage = document.querySelector('#input-message');
const inputNickname = document.querySelector('#input-nickname');

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

const reorderList = (nicknames) => {
  console.log('nick', nick);
  const newList = [];
  nicknames.forEach((nickname) => {
    if (nickname === nick) {
      newList.unshift(nickname);
    } else {
      newList.push(nickname);
    }
  });
  console.log('newList', newList);

  return newList;
};

const createNickList = (nicknames) => {
  console.log('nicknames', nicknames);
  const reorderedNickList = reorderList(nicknames);    
  reorderedNickList.forEach((nickname) => {
    const newLi = newElement('li');
    newLi.setAttribute('data-testid', 'online-user');
    newLi.innerText = nickname;
    nicknamesList.appendChild(newLi);
  });
  console.log('reorderedNickList', reorderedNickList);
};

const setNewNickname = () => {
  if (inputNickname.value) {
    socket.emit('changeNickname', { removedNick: nick, newNick: inputNickname.value });
    nick = inputNickname.value;
    inputNickname.value = '';
  }
};

submitNickname.setAttribute('onlick', setNewNickname);

socket.on('connect', () => {
  nick = (socket.id).substr(0, 16);
  socket.emit('newUser', nick);
});

socket.on('newUser', (nicknames) => {
  nicknamesList.innerText = '';
  createNickList(nicknames);
});

socket.on('disconnected', (nicknames) => {
  nicknamesList.innerText = '';
  createNickList(nicknames);
});

socket.on('changeNickname', (newNicknamesList) => {
  nicknamesList.innerText = '';
  createNickList(newNicknamesList);
});

socket.on('message', (msg) => {
  createMsgContainer(msg);
  window.scrollTo(0, document.body.scrollHeight);
});
