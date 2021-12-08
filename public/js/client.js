const socket = window.io();

// inputs
const nameInput = document.querySelector('#nameInput');
const messageInput = document.querySelector('#messageInput');

// uls
const usersUl = document.querySelector('#usersUl');
const chatUl = document.querySelector('#chatUl');

// buttons
const enterButton = document.querySelector('#enterButton');
const sendButton = document.querySelector('#sendButton');

let nickHash;

const dataTestId = 'data-testid';

socket.on('connection', (hashNick) => {
  nickHash = hashNick;
  const usersLi = document.createElement('li');
  usersLi.innerText = hashNick;
  usersLi.setAttribute(dataTestId, 'online-user');
  usersLi.setAttribute('class', 'userId-Name');
  usersUl.appendChild(usersLi);
});

socket.on('connectedMessages', (messages) => {
  messages.forEach((i) => {
    const messageLi = document.createElement('li');
    messageLi.innerText = `${i.timestamp} - ${i.nickname}: ${i.message}`;
    messageLi.setAttribute(dataTestId, 'message');
    chatUl.appendChild(messageLi);
  });
});

// Insere os usuários
enterButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('userEnter', nameInput.value);
});

const showUsers = (userName, hashNick) => {
  const usersLi = document.querySelectorAll('.userId-Name');
  usersLi.forEach((i, index) => {
    if (i.innerText === hashNick) {
      usersLi[index].innerText = userName;
      nickHash = userName;
    }
  });
};

socket.on('userLogin', ({ userName, hashNick }) => showUsers(userName, hashNick));

// Insere as mensagens
sendButton.addEventListener('click', (e) => {
  e.preventDefault();
  const chatMessage = messageInput.value;
  const nickname = nickHash;
  socket.emit('message', { chatMessage, nickname });
});

const showMessages = (message) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = message;
  messageLi.setAttribute(dataTestId, 'message');
  chatUl.appendChild(messageLi);
};

socket.on('message', (message) => showMessages(message));
