const socket = window.io();
// window.io() serve para enfatizar que a função io é uma função injetada ao objeto window do DOM da página. Dessa forma, da para seguir utilizando socket, mas agora em um arquivo separado.

let nicknameGenerate = ''; 

const listaMensagens = document.querySelector('#messages');
// const listaUsuarios = document.querySelector('#users');
// const inputNickname = document.querySelector('#nickname');
// const btnNickname = document.querySelector('#nicknameBtn');
const inputMessage = document.querySelector('#messageBox');
const btnEnviar = document.querySelector('#sendBtn');

// cria uma li coloca dentro da ul e adiciona o conteudo da mensagem dentro dela
const createMessage = (newMessage) => {
  const li = document.createElement('li');
  li.innerText = newMessage;
  li.setAttribute('data-testid', 'message');
  listaMensagens.appendChild(li);
};

// Botão envia o name e a mensagem entre cliente.
btnEnviar.addEventListener('click', () => { 
  socket.emit('message', { 
    nickname: nicknameGenerate,
    chatMessage: inputMessage.value, 
  });
  nicknameGenerate = '';
  inputMessage.value = '';
  return false;
});

socket.on('message', (newMessage) => createMessage(newMessage));