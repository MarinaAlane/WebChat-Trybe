const socket = window.io();
const form = document.querySelector('form');
const inputMessage = document.querySelector('#messageInput');
let userID;

socket.on('userID', id => userID = id);

const createLIitens = (text) => {
const div = document.getElementById('messages-div');
const p = document.createElement('p');
p.innerText = text;
div.appendChild(p);
};

form.addEventListener('submit', (e) => {
    e.preventDefault();
    socket.emit('clientMessage', inputMessage.value);
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
