const socket = window.io();

const formSendMessage = document.querySelector('#form-chatMessage');

//  Não consigo importar o arquivo moment
// function getDate() {
//   const date = moment().locale('pt-br').format('L').replace(/\//g, '-');
//   const time = moment().format('LTS');
//   return `${date} ${time}`;
//   // return '12/12/12';
// }

function sendMessage(event) {
  // const fullDate = getDate();
  // const msg = `${fullDate} - ${nickname}: ${chatMessage}`;
  event.preventDefault();
  console.log('função sendMessage acionada (chat.js)');
  const chatMessage = document.querySelector('input[name=chatMessage');
  socket.emit('message', chatMessage.value);
  chatMessage.value = '';
}

function reciveMessage(msg) {
  const li = document.createElement('li');
  const message = document.createTextNode(msg);
  li.append(message);

  const webchatList = document.querySelector('#webchat');
  webchatList.appendChild(li);
}

formSendMessage.addEventListener('submit', sendMessage);

socket.on('message', (msg) => {
  console.log('message socket.on acionada (chat.js)');
  reciveMessage(msg);
});
