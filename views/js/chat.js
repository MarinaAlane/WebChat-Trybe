const socket = window.io();

  const form = document.querySelector('#form');
  const formNick = document.querySelector('#formNick');
  const input = document.querySelector('#input');
  const userName = document.querySelector('#userName');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    socket.emit('message', {
      chatMessage: input.value,
      nickname: userName.value,
    });
    input.value = '';
    return false;
    });

    formNick.addEventListener('click', (e) => {
    e.preventDefault();

    socket.emit('id', {
      nickname: userName.value,
    });
    return false;
    });

  socket.on('message', (chatMessage) => {
    const ul = document.querySelector('#ul');
    const message = document.createElement('li');
    message.innerText = chatMessage;
    ul.appendChild(message);
  });
