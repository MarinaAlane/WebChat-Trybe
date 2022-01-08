const socket = window.io();

const formButtonMessages = document.querySelector('#sendButton');
const formButtonNickname = document.querySelector('#nicknameButton');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');
const messagesUl = document.querySelector('#messages');
let randomNickname = document.querySelector('#randomNickname');
const usersList = document.querySelector('#usersList');
const dataTestId = 'data-testid'; 

// https://www.codegrepper.com/code-examples/javascript/find+random+name+javascript - 
function getRandomChars() {
  const randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 16; i += 1) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }
  return result;
}

randomNickname.innerText = getRandomChars(); // adiciona random no HTML

formButtonNickname.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = nicknameInput.value;
  console.log(`salvou o nome ${nickname}`);

  randomNickname.innerText = nickname;
  nicknameInput.value = '';

  sessionStorage.setItem('username', JSON.stringify(nickname));
  socket.emit('updateUsername', nickname);
});

formButtonMessages.addEventListener('click', (e) => {
  e.preventDefault(); // cancela a atualizacado da pãgina
  console.log('enviou a msg');
  const nickname = JSON.parse(sessionStorage.getItem('username')) || randomNickname;
  const message = messageInput.value;
  messageInput.value = '';

  const data = {
    chatMessage: message,
    nickname,
  };

  socket.emit('message', data);
}); 

const createMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.setAttribute(dataTestId, 'message');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};

const createUser = (user) => {
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute(dataTestId, 'online-user');
  usersList.appendChild(li);
};

const usersOn = (users) => {
  // console.log({users});
  const list = Object.values(users);
  console.log('object:', list);

  usersList.innerHTML = '';
  
  // console.log({usersList});
  list.filter((user) => user !== list).forEach((nickname) => createUser(nickname));
};

socket.on('updateUsername', ((nickname) => {
  // console.log({ nickname });
  randomNickname = nickname;
  // console.log({ randomNickname });
}));

socket.on('message', (chatMessage) => createMessage(chatMessage));

socket.on('username', (users) => {
  const list = Object.values(users);
  // console.log({ list });
  usersOn(list);
  socket.emit('username', list);
});

socket.on('history', (messages) => {
  messages.forEach((message) => {
    const li = document.createElement('li');
    li.setAttribute(dataTestId, 'message');
    li.innerText = message;
    messagesUl.appendChild(li);
  });
});

window.onload = () => {
  socket.emit('updateUsername', randomNickname.innerText);
}; 
