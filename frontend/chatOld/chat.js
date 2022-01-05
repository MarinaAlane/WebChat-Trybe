const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
let userID;

const { nickname } = Qs.parse(location.search, {
  ignoreQueryPrefix: true});

// socket.on('userID', id => userID = id);

const createLIitens = (text) => {
const div = document.getElementById('messages-div');
const p = document.createElement('p');
p.innerText = text;
div.appendChild(p);
};

// let dataAtual;
// let horaAtual;

form.addEventListener('submit', (e) => {
  // let data = new Date();
  // let dia = String(data.getDate()).padStart(2, '0');
  // let mes = String(data.getMonth() + 1).padStart(2, '0');
  // let ano = data.getFullYear();

  // dataAtual = dia + '-' + mes + '-' + ano;
  // horaAtual = data.toLocaleTimeString('pt-BR');
  
    e.preventDefault();
    socket.emit('message', {
      nickname,
      chatMessage: inputMessage.value
    });

    inputMessage.value = '';
    
    return false;
});

socket.on('youLogged', msg => {
  createLIitens(msg);
})

socket.on('userLogged', data => { // We can also use socket.broadcast.emit (in serverSide) instead.
  if (data.userID === userID) return;
  createLIitens(data.msg);
})

socket.on('serverBroadcast', msg => {

  createLIitens(msg);
})
