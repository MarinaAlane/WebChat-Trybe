const client = window.io();

// Eventos JS
const inputNick = document.querySelector('#nickname');
const btnNickName = document.querySelector('#nickname-button');
const listUsers = document.querySelector('#content-list');
const listMessages = document.querySelector('#content-messages');
const inputMessage = document.querySelector('#message');
const btnSend = document.querySelector('#send-button');

const createUsers = (user) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'online-user');
  li.innerHTML = user;
  return li;
};

const createMessages = (message) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerHTML = message;
  return li;
};

let nickname = '';

btnSend.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputMessage.value) {
    const nick = nickname || client.id.substring(0, 16);
    client.emit('message', { chatMessage: inputMessage.value, nickname: nick });
    inputMessage.value = '';
  }
});

btnNickName.addEventListener('click', (ev) => {
  ev.preventDefault();
  if (inputNick.value) {
    nickname = inputNick.value;
    client.emit('nickname', nickname);
    inputNick.value = '';
  }
});

client.on('message', (data) => {
  listMessages.append(createMessages(data));
});

client.on('allUsers', (data) => {
  listUsers.innerHTML = '';
  if (!nickname) nickname = data[data.length - 1];

  listUsers.appendChild(createUsers(nickname));
  const users = data.filter((user) => user !== nickname);
  users.forEach((user) => listUsers.appendChild(createUsers(user)));
});

client.on('allMessages', (data) => {
  data.forEach((dataMessage) => {
    const { message, nickname: nick, timestamp } = dataMessage;
    const msgFormatted = `${timestamp} - ${nick}: ${message}`;
    listMessages.appendChild(createMessages(msgFormatted));
  });
});

// Ref: meu antigo projeto: https://github.com/tryber/sd-010-a-project-webchat/pull/89/files e do colega Adelino Jr