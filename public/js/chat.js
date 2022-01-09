const socket = window.io();
// window.io() serve para enfatizar que a função io é uma função injetada ao objeto window do DOM da página. Dessa forma, da para seguir utilizando socket, mas agora em um arquivo separado.

const listaMensagens = document.querySelector('#messages');
const listaUsuarios = document.querySelector('#users');
const inputNickname = document.querySelector('#nickname');
const btnNickname = document.querySelector('#nicknameBtn');
const inputMessage = document.querySelector('#messageBox');
const btnEnviar = document.querySelector('#sendBtn');

// https://qastack.com.br/programming/1349404/generate-random-string-characters-in-javascripts
// Função que gera um name aleatorio.

const generateName = (cont) => { 
  let result = '';
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < cont; i += 1) {
    result += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return result;
};

let nicknameGenerate = generateName(16);
// envia o nickname em todos clientes
socket.emit('newUser', nicknameGenerate);

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

// cria uma li e coloca dentro da ul e adiciona o name do usuario
const userList = (user) => {
  const li = document.createElement('li');
  li.innerText = user;
  li.setAttribute('data-testid', 'online-user');
  listaUsuarios.appendChild(li);
};
userList(nicknameGenerate);

// botão com evento nickname que adiciona o name do meu usuario.
btnNickname.addEventListener('click', () => {
  nicknameGenerate = inputNickname.value;
  inputNickname.value = '';
  socket.emit('nickname', nicknameGenerate); 
});

socket.on('loadUsers', (users) => {
  listaUsuarios.innerHTML = '';
  userList(nicknameGenerate);
  users.forEach((user) => {
    if (user !== nicknameGenerate) {
      return userList(user);
    }
  });
});

socket.on('message', (newMessage) => createMessage(newMessage));
socket.on('messageLoad', (newMessage) => createMessage(newMessage)); 
