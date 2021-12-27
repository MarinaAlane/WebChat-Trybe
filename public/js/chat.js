const socket = window.io();

const formSendMessage = document.querySelector('#form-chatMessage');
const nickname = document.querySelector('input[name=nickname').value;
// const btnNickname = document.querySelector('#btn-nickname');
// const usersList = document.querySelector('#users-list');
// const webchatList = document.querySelector('#webchat');
const chatMessage = document.querySelector('input[name=chatMessage').value;

//  Não consigo importar o arquivo moment
function getDate() {
  const date = moment().locale('pt-br').format('L').replace(/\//g, '-');
  const time = moment().format('LTS');
  return `${date} ${time}`;
  // return '12/12/12';
}

function sendMessage(event) {
  console.log('event');
  event.preventDefault();
  const fullDate = getDate();
  const msg = `${fullDate} - ${nickname}: ${chatMessage}`;
  console.log(msg);

  socket.emit('message', msg);
}

// function sendMessage(msg) {
//   const li = document.createElement('li');
//   const message = document.createTextNode(msg);

//   li.append(message);
//   webchatList.appendChild(li);
// }

formSendMessage.addEventListener('submit', sendMessage);

socket.on('message', (msg) => {
  console.log('asdfffffffffffffffffffffffff');

  sendMessage(msg);
});
