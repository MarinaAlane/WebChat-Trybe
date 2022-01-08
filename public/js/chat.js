//  Estou tendo varias conexoes sockets que n quero. Pesquisei e achei essa materia falando sobre o modo de pesquisa thhp padãro do socket
//  https://www.ti-enxame.com/pt/javascript/pagina-node.js-socket.io-atualiza-varias-conexoes/830171781/
const socket = window.io({ transports: ['websocket'], upgrade: false });

const connectionsList = document.querySelector('#connections-list');
const webchatList = document.querySelector('#webchat');
const formNickname = document.querySelector('#form-nickname');

const formSendMessage = document.querySelector('#form-chatMessage');
const inputMsg = document.querySelector('input[name=chatMessage');

function reciveMessage(msg) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = msg;
  console.log('reciveMessage --->', msg);
  webchatList.appendChild(li);
}

function sendMessage(event) {
  event.preventDefault();

  socket.emit('message', {
    chatMessage: inputMsg.value,
    nickname: connectionsList.firstChild.innerText,
  });

  inputMsg.value = '';
}

function saveNickname(nickname) {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = `${nickname}`;

  connectionsList.appendChild(li);
}

function setNickname(event) {
  event.preventDefault();
  const newNickname = document.querySelector('input[name=nickname').value;

  connectionsList.firstChild.innerText = newNickname;

  socket.emit('setNickname', newNickname);
  newNickname.value = '';
}

//  Buscar deletar essa função - Não deve ser necessario apagar tudo para depois renderizar novamente
// function removeAllNicknames() {
//   // Para remover todos os childrens da lista de usuarios usei a seguinte referencia:
//   // https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/
//   let child = connectionsList.lastElementChild;
//   while (child) {
//     connectionsList.removeChild(child);
//     child = connectionsList.lastElementChild;
//   }
// }

// function setNickname(event) {
//   event.preventDefault();

//   const newNickname = document.querySelector('input[name=nickname');
//   socket.emit('setNickname', newNickname.value);
//   newNickname.value = '';
// }

//  ------------------------------------------------------------------------------------------------------
socket.on('message', (msg) => reciveMessage(msg));
socket.on('newUser', (newUser) => saveNickname(newUser));

// socket.on('nickname', (nickname) => {
//   // removeAllNicknames(); // Mudar essa logica para nõ deletar todos os nomes e depois reescrevee
//   const oldNickname = document.querySelector(
//     `li[name=${socket.id.substr(0, 16)}]`,
//   );
//   if (oldNickname) connectionsList.removeChild(oldNickname);
//   saveNickname(nickname);
// });

//  -----------------------------------------------------------------------------------------------------------
formSendMessage.addEventListener('submit', sendMessage);
formNickname.addEventListener('submit', setNickname);

window.onbeforeunload = () => {
  socket.disconnect();
};
