const socket = window.io();
const userConnect = document.getElementById('users');
const formMessages = document.getElementById('chat');
const messagesUsers = document.getElementById('messages');
const messageBox = document.getElementById('message-box');
const nicknameBox = document.getElementById('nickname-box');
const saveNickname = document.getElementById('save-button');

let nickname = ''; // Req. 2 - o nickname personalizado começa vazio, enquanto isso, é exibido na tela o id do usuário com 16 caracteres

formMessages.addEventListener('submit', (event) => {
  event.preventDefault(); // previne que o botão já seja clicado ao recarregar a página
  socket.emit('message', { // Req. 1-  emitindo mensagem para o servidor
    nickname, // foi setado na função saveNickname
    chatMessage: messageBox.value,
  });
  messageBox.value = ''; // Req. 2 - após emitir a mensagem o campo fica vazio
});

saveNickname.addEventListener('click', (event) => { // Req. 2 - adiciona o nome ao clicar no botão salvar
  event.preventDefault(); // previne que o botão já seja clicado ao recarregar a página
  nickname = nicknameBox.value; // setar o usuário criado de forma personalizada
});

socket.on('message', (message) => { // Req. 1 - cada cliente conectado, vai ouvir a mensagem já formatada, vinda do servidor  
  const li = document.createElement('li'); // Req. 2 -  as mensagens digitadas aparecem no quadro a direita da tela
  li.innerText = message; // as mensagens são colocadas na tela de forma ordenada
  li.setAttribute('data-testid', 'message'); // setando o atributo onde cada mensage vai receber o data-testid
  messagesUsers.appendChild(li); // a mensagem digitada aparece na tela
});

const userCreated = (newId) => { // Req. 2 - criando o novo usuário
  const li = document.createElement('li');
  li.innerText = newId;
  li.setAttribute('data-testid', 'online-user');
  userConnect.appendChild(li);
};

socket.on('newUser', userCreated);
