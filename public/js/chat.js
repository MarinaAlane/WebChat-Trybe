//  Estou tendo varias conexoes sockets que n quero. Pesquisei e achei essa materia falando sobre o modo de pesquisa thhp padrão do socket
//  https://www.ti-enxame.com/pt/javascript/pagina-node.js-socket.io-atualiza-varias-conexoes/830171781/
const socket = window.io({ transports: ['websocket'], upgrade: false });

const connectionsList = document.querySelector('#connections-list');
const webchatList = document.querySelector('#webchat');
const formNickname = document.querySelector('#form-nickname');
const userh2 = document.querySelector('#user');
const formSendMessage = document.querySelector('#form-chatMessage');
const inputNickname = document.querySelector('input[name=nickname');
const inputMsg = document.querySelector('input[name=chatMessage');

const ONLINE_USER = 'online-user';
const DATA_TEST_ID = 'data-testid';

function reciveMessage(msg) {
  const li = document.createElement('li');
  li.setAttribute(DATA_TEST_ID, 'message');
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
  li.setAttribute(DATA_TEST_ID, ONLINE_USER);
  li.innerText = `${nickname}`;

  userh2.innerText = nickname;
  connectionsList.appendChild(li);
}

function setNickname(event) {
  event.preventDefault();
  const newNickname = inputNickname.value;

  connectionsList.firstChild.innerText = newNickname;
  userh2.innerText = newNickname;

  inputNickname.value = '';
  socket.emit('setNickname', newNickname);
}

function newUserList(users) {
  const listUsers = Object.values(users);
  connectionsList.innerHTML = '';

  const li = document.createElement('li');
  li.setAttribute(DATA_TEST_ID, ONLINE_USER);
  li.innerText = userh2.innerText;
  connectionsList.appendChild(li);

  listUsers.forEach((nick) => {
    if (nick !== userh2.innerText) {
      const li2 = document.createElement('li');
      li2.setAttribute(DATA_TEST_ID, ONLINE_USER);
      li2.innerText = nick;
      connectionsList.appendChild(li2);
    }
  });
}

// function renderMessages(allmessages) {
//   const msg = allmessages();
//   console.log(allmessages);
//   console.log(msg)
// }

//  ------------------------------------------------------------------------------------------------------
socket.on('newUser', (newUser) => saveNickname(newUser));
socket.on('message', (msg) => reciveMessage(msg));
socket.on('userList', (userList) => newUserList(userList));
// socket.on('historyMessage', (allmessages) => renderMessages(allmessages));

//  -----------------------------------------------------------------------------------------------------------
formSendMessage.addEventListener('submit', sendMessage);
formNickname.addEventListener('submit', setNickname);

window.onbeforeunload = () => {
  socket.disconnect();
};
