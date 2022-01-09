const socket = window.io();

const sendbutton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageInput');
const usersList = document.querySelector('#users-list');
const onlineUserID = 'online-user';

function createItem() {
  const li = document.createElement('li');
  return li;
}

function getNickname(id) {
  const nickName = sessionStorage.getItem('nickname');
  if (!nickName) return id.substr(0, 16);
  return nickName;
}

function removeUser(array, removedUser) {
  return array.filter((user) => user !== removedUser);
}

function addNewUser(username) {
  const li = createItem();
  li.innerText = username;
  li.dataset.testid = onlineUserID;
   usersList.appendChild(li);
}
sendbutton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = getNickname(socket.id);
    socket.emit('message', { chatMessage: inputMessage.value, nickname: id });
    inputMessage.value = '';
    return false;
   });
        const createMessage = (message) => {
        const li = createItem();
        const messagesUl = document.querySelector('#messages');
        li.dataset.testid = 'message';
        li.innerText = message;
        messagesUl.appendChild(li);
        };

        socket.on('message', (message) => createMessage(message));
        const nickButton = document.querySelector('#nickButton');
        const nickInput = document.querySelector('#nickInput');

        nickButton.addEventListener('click', (e) => {
          e.preventDefault();
          const lastName = getNickname(socket.id);
          sessionStorage.setItem('nickname', nickInput.value);
          socket.emit('changeName', lastName, nickInput.value);
          nickInput.value = '';
        });

        socket.on('history', (message) => {
          message.forEach((mess) => {
            const li = createItem();
            const messagesUl = document.querySelector('#messages');
            li.dataset.testid = 'message';
            li.innerText = `${mess.timestamp} ${mess.nickname} ${mess.message}`;
            messagesUl.appendChild(li);
          });
        });

        socket.on('renderList', (array) => {
          usersList.innerHTML = '';
          const username = getNickname(socket.id);
          const newArray = removeUser(array, username);
          console.log(socket.id.substr(0, 16), username, newArray);
          addNewUser(username);
          newArray.forEach((user) => {
            addNewUser(user);
          });
        });
