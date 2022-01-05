const socket = window.io('http://localhost:3000/');
const loginBtn = document.getElementById('loginBtn');
const sendMsgBtn = document.getElementById('sendBtn');
const warningNickname = document.getElementById('warningNickname');
const messageInput = document.querySelector('#messageInput');
let userID;
let nickname;

socket.on('userID', (id) => { userID = id; });

const createLIitens = (text) => {
  const div = document.getElementsByClassName('messages-div')[0];
  const p = document.createElement('p');
  p.innerText = text;
  div.appendChild(p);
};

loginBtn.addEventListener('click', (e) => {
  nickname = document.getElementById('nickname').value;
  e.preventDefault();
});

// let dataAtual;
// let horaAtual;

sendMsgBtn.addEventListener('click', (e) => {
  // let data = new Date();
  // let dia = String(data.getDate()).padStart(2, '0');
  // let mes = String(data.getMonth() + 1).padStart(2, '0');
  // let ano = data.getFullYear();
  e.preventDefault();

  // dataAtual = dia + '-' + mes + '-' + ano;
  // horaAtual = data.toLocaleTimeString('pt-BR');
  
  if (!nickname) {
    warningNickname.innerText = 'Preencha um nickname antes';
    return false;
  } 
  
  socket.emit('message', {
    nickname,
    chatMessage: messageInput.value,
  });

    messageInput.value = '';
    return false;
});

socket.on('youLogged', (msg) => {
  createLIitens(msg);
});

socket.on('userLogged', (data) => { // We can also use socket.broadcast.emit (in serverSide) instead.
  if (data.userID === userID) return;
  createLIitens(data.msg);
});

socket.on('serverBroadcast', (msg) => {
  createLIitens(msg);
});
