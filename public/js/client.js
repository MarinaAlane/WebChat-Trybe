const socket = window.io();

// Inputs
const nameInput = document.querySelector('#nameInput');
const messageInput = document.querySelector('#messageInput');

// UL's
const usersUl = document.querySelector('#usersUl');
const chatUl = document.querySelector('#chatUl');

// Buttons
const enterButton = document.querySelector('#enterButton');
const sendButton = document.querySelector('#sendButton');

// Necessário para LINT
const dataTestId = 'data-testid';

// Variavel que irá armazenar o nickname do usuário
let nickname;

const updateUsers = (users) => {
  // Limpa o UL para conseguir tirar os usuários que desconectaram
  usersUl.innerHTML = '';

  // For each para adicionar os usuários na UL
  users.forEach((user) => {
    const usersLi = document.createElement('li');
    usersLi.innerText = user;
    usersLi.setAttribute(dataTestId, 'online-user');
    usersLi.setAttribute('class', 'userId-Name');
    usersUl.appendChild(usersLi);
  });
};

// Escuta o evento de connection do servidor
socket.on('connection', (users) => {
  updateUsers(users);
});

// Escuta o evento throwId para armazenar o ID de cada usuário no nickname
socket.on('throwId', ({ userId, users }) => {
  nickname = userId;
  const orderedUsers = [];
  const lastUser = users[users.length - 1];

  orderedUsers.push(lastUser);

  const limitedUsers = users.slice(0, users.length - 1);
  limitedUsers.forEach((user) => orderedUsers.push(user));
  updateUsers(orderedUsers);
});

// Evento para enviar uma mensagem e nickname ao servidor
sendButton.addEventListener('click', (e) => {
  e.preventDefault();

  const chatMessage = messageInput.value;

  socket.emit('message', { chatMessage, nickname });
});

// Função para adicionar a mensagem à UL de mensagens
const showMessages = (message) => {
  const messageLi = document.createElement('li');
  messageLi.innerText = message;
  messageLi.setAttribute(dataTestId, 'message');
  chatUl.appendChild(messageLi);
};

// Escuta o evento message e chama a função de exibir as mensagens
socket.on('message', (message) => showMessages(message));

// Envia o evento de mudança de nome ao servidor
enterButton.addEventListener('click', (e) => {
  e.preventDefault();
  socket.emit('changeNickname', nameInput.value);
});

// Evento que altera o username dos usuários
socket.on('changeUsersName', (users) => {
  const orderedUsers = [];
  const lastUser = users[users.length - 1];

  orderedUsers.push(lastUser);

  const limitedUsers = users.slice(0, users.length - 1);
  limitedUsers.forEach((user) => orderedUsers.push(user));
  updateUsers(orderedUsers);
});

socket.on('connectedMessages', (messages) => {
  messages.forEach((i) => {
    const messageLi = document.createElement('li');
    messageLi.innerText = `${i.timestamp} - ${i.nickname}: ${i.message}`;
    messageLi.setAttribute(dataTestId, 'message');
    chatUl.appendChild(messageLi);
  });
});

socket.on('discon', (users) => {
  updateUsers(users);
});

window.onbeforeunload = (_e) => {
  socket.disconnect();
};
