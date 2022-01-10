const socket = window.io();

const formButtonMessages = document.querySelector('#sendButton');
const formButtonNickname = document.querySelector('#nicknameButton');
const messageInput = document.querySelector('#messageInput');
const nicknameInput = document.querySelector('#nicknameInput');
const messagesUl = document.querySelector('#messages');
const randomNickname = document.querySelector('#randomNickname');
const usersList = document.querySelector('#usersList');
const dataTestId = 'data-testid'; 

// requisito 4 criado com o auixilio de Lima e Matheus Monteiro
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
// console.log('rand', randomNickname.innerText)
sessionStorage.setItem('username', randomNickname.innerText);
formButtonNickname.addEventListener('click', (e) => {
  e.preventDefault();
  const nickname = nicknameInput.value;
  console.log(`salvou o nome ${nickname}`);

  randomNickname.innerText = nickname;
  nicknameInput.value = '';

  sessionStorage.setItem('username', nickname);
  socket.emit('updateUsername', nickname);
});

formButtonMessages.addEventListener('click', (e) => {
  e.preventDefault(); // cancela a atualizacado da pãgina
  console.log('enviou a msg');
  const nickname = sessionStorage.getItem('username');
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
  console.log({ user });
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute(dataTestId, 'online-user');
  // const username = sessionStorage.getItem('username'); 
  usersList.appendChild(li);
};

const usersOn = (users) => {
  console.log({ users });
  const list = Object.values(users);
  const username = sessionStorage.getItem('username'); 
  // console.log(socket.id);

  const currentUser = users.find((user) => 
    user === username);
  console.log({ currentUser });
  console.log('random', randomNickname.innerText);

  usersList.innerHTML = '';
  
  // list.unshift(currentUser);
  // console.log(list)
  createUser(currentUser); // crio o usuario e filtro posteriormente para conseguir listar todos
if (username) {
  list.filter((user) => user !== currentUser).forEach((nick) => createUser(nick));
}
};

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
// slack
window.onbeforeunload = () => {
  socket.disconnect();
}; 
