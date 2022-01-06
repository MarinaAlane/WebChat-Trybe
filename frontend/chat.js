const socket = window.io();

const sendbutton = document.querySelector('#sendButton');
const inputMessage = document.querySelector('#messageInput');

  function getNickname(id) {
   const nickName = sessionStorage.getItem('nickname');
    if (!nickName) return id.substr(0, 16);
    return nickName;
  }

   sendbutton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = getNickname(socket.id);
    socket.emit('message', { chatMessage: inputMessage.value, nickname: id });
    inputMessage.value = '';
    return false;
   });
        const createMessage = (message) => {
        const messagesUl = document.querySelector('#messages');
        const li = document.createElement('li');
        li.dataset.testid = 'message';
        li.innerText = message;
        messagesUl.appendChild(li);
        };

        socket.on('newUser', () => {
        const messagesUl = document.querySelector('#messages');
        const li = document.createElement('li');
        li.dataset.testid = 'online-user';
        const id = getNickname(socket.id);
        li.innerText = id;
        messagesUl.appendChild(li);
        });
        socket.on('message', (message) => createMessage(message));
        const nickButton = document.querySelector('#nickButton');
        const nickInput = document.querySelector('#nickInput');
        nickButton.addEventListener('click', (e) => {
          e.preventDefault();
          sessionStorage.setItem('nickname', nickInput.value);
          nickInput.value = '';
        });