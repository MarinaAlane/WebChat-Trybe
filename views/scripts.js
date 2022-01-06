const socket = window.io();

const testid = 'data-testid';

const inputNickname = document.getElementById('input-nickname');
const botaoNickName = document.getElementById('botao-nickname');
const inputMessage = document.getElementById('input-message');
const botaoMessage = document.getElementById('botao-message');

let userName = '';

botaoMessage.addEventListener('click', (evento) => {
  evento.preventDefault();
  const nickname = userName || socket.id.slice(0, 16);
  socket.emit('message', { chatMessage: inputMessage.value, nickname });
  inputMessage.value = '';
});

const mensagemUsuario = (message) => {
  const mensagem = document.getElementById('mensagensUsuarios');
  const li = document.createElement('li');
  li.innerText = message;
  li.setAttribute(testid, 'message');
  mensagem.appendChild(li);
};

botaoNickName.addEventListener('click', (evento) => {
  evento.preventDefault();
  userName = inputNickname.value;
  if (userName !== '') {
    socket.emit('novoUsername', userName);
    inputNickname.value = '';
  }
});

const onlineUser = (nick) => {
  const nicknameFormatado = socket.id.slice(0, 16);
  const usuarios = document.getElementById('usuariosOnline');
  usuarios.innerHTML = '';
  nick.forEach((elemento) => {
    const li = document.createElement('li');
    li.setAttribute(testid, 'online-user');
    li.innerText = elemento;
    if (elemento === userName || elemento === nicknameFormatado) {
      return usuarios.prepend(li);
    }
    usuarios.appendChild(li);
  });
};

const mensagensDB = (mensagens) => {
    mensagens.forEach(({ timeLog, nickname, chatMessage }) => {
    const mensagem = document.getElementById('mensagensUsuarios');
    const li = document.createElement('li');
    li.innerText = `${timeLog} - ${nickname} : ${chatMessage}`;
    li.setAttribute(testid, 'message');
    mensagem.appendChild(li);
  });
};

socket.on('logDeMensagens', (mensagens) => mensagensDB(mensagens));

socket.on('message', (chatMessage) => mensagemUsuario(chatMessage));

socket.on('onlineUser', (nick) => onlineUser(nick)); 
