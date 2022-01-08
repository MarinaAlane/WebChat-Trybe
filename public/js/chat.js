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

  userh2.innerText = nickname;
  console.log(document.querySelector('#connections-list'));
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
  console.log(connectionsList.parentNode)

  const listUsers = Object.values(users);
  const newList = connectionsList.cloneNode(false);
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerText = userh2.innerText;
  newList.appendChild(li);

  listUsers.forEach((nick) => {
    if (nick !== userh2.innerText) {
      const li2 = document.createElement('li');
      li2.setAttribute('data-testid', 'online-user');
      li2.innerText = nick;
      newList.appendChild(li2);
    }
  });
  connectionsList.parentNode.replaceChild(newList, connectionsList);

}

//  ------------------------------------------------------------------------------------------------------
socket.on('newUser', (newUser) => saveNickname(newUser));
socket.on('message', (msg) => reciveMessage(msg));
socket.on('userList', (userList) => newUserList(userList));

//  -----------------------------------------------------------------------------------------------------------
formSendMessage.addEventListener('submit', sendMessage);
formNickname.addEventListener('submit', setNickname);

window.onbeforeunload = () => {
  socket.disconnect();
};
