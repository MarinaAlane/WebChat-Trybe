const socket = window.io();
/* 
window.io() , isso serve para enfatizar que a função io é uma função injetada ao objeto window do DOM da página. Dessa forma, conseguimos seguir utilizando nosso socket, mas agora em um arquivo separado 
*/

const formMessage = document.getElementById('messageForm');
const inputMessage = document.getElementById('messageInput');

formMessage.addEventListener('submit', (e) => {
  e.preventDefault();
  socket.emit('message', { 
    chatMessage: inputMessage.value, 
    nickname: sessionStorage.getItem('user'),
  });
  inputMessage.value = '';
  return false;
});

const userForm = document.getElementById('userForm');
const userInput = document.getElementById('userInput');
const nickName = document.getElementById('nickName');

userForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('user', userInput.value);
  nickName.innerText = sessionStorage.getItem('user');
  userInput.value = '';
  return false;
});

/* 
Esse trecho de código determina que ao clicar no botão submit do formulário, 
será enviado um evento message com a mensagem preenchida, e o usuário 
*/

const createMessage = (message) => {
  const messagesUl = document.querySelector('#messages');
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = message;
  messagesUl.appendChild(li);
};
/*
Função createMessage - busca a ul messages via document 
- cria um li - coloca dentro dessa li a messagem que veio por paramentro 
- coloca essa li dentro da ul
*/

socket.on('message', (message) => createMessage(message));
socket.on('user', (id) => {
  sessionStorage.setItem('user', id);
  nickName.innerText = sessionStorage.getItem('user');
});
/*
quando o evento 'message' for recebido vamos chamar a função createMessage passando a mensagem como parametro
o socket.on:
Identifica o socket emit do Back pelo parametro 'user' e 'message' e  na callback recebe o parametro especifico: 
*/
