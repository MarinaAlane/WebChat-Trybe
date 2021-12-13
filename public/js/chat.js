const socket = window.io();
/* 
window.io() , isso serve para enfatizar que a função io é uma função injetada ao objeto window do DOM da página. Dessa forma, conseguimos seguir utilizando nosso socket, mas agora em um arquivo separado 
*/

const messageForm = document.getElementById('message-form');
const inputMessage = document.getElementById('message-input');

const nicknameForm = document.getElementById('nickname-form');
const inputNickname = document.getElementById('nickname-input');
const nickname = document.getElementById('nickname');

messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
    const messageObj = {
      chatMessage: inputMessage.value,
      user: sessionStorage.getItem('user'),
    };
    socket.emit('message', messageObj);
    inputMessage.value = '';
    return false;
  });

/* 
Esse trecho de código determina que ao clicar no botão submit do formulário, 
será enviado um evento message com a mensagem preenchida, e o usuário 
*/

nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  sessionStorage.setItem('user', inputNickname.value);
  nickname.innerHTML = sessionStorage.getItem('user');

  inputNickname.value = '';
  return false;
});

function createMessage(msg) {
  const ulMessage = document.querySelector('#messages');
  const liMessage = document.createElement('li');
  liMessage.setAttribute('data-testid', 'message');
  liMessage.innerText = msg;
  ulMessage.appendChild(liMessage);
}

/*
Função createMessage - busca a ul messages via document 
- cria um li - coloca dentro dessa li a messagem que veio por paramentro 
- coloca essa li dentro da ul
*/

socket.on('user', (id) => {
  sessionStorage.setItem('nickname', id);
  nickname.innerHTML = sessionStorage.getItem('nickname');
});
socket.on('message', (message) => {
  createMessage(message);
});

/*
Quando o evento 'user' for recebido, vamos  grarda-lo no session storage com chave user e valor id`
quando o evento 'message' for recebido vamos chamar a função createMessage passando a mensagem como parametro
o socket.on:
Identifica o socket emit do Back pelo parametro 'user' e 'message' e  na callback recebe o parametro especifico: 
*/