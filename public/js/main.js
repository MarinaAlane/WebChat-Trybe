import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
import OnlineUsers from './onlineUsersClient.js';

const socket = io();
const onlineUsers = OnlineUsers();
onlineUsers.addObs((list) => {
  onlineUsers.render(list);
});

socket.on('connect', () => {
  console.log('new user', socket.id);
});

socket.on('render-online-users', (list) => {
  onlineUsers.notifyAllObs(list);
});

socket.on('del-user', (id) => {
  console.log('del user', id);
  onlineUsers.delUser(id);
});

  const button = document.getElementById('button');
  button.addEventListener('click', () => {
    const input = document.getElementById('input').value;
    console.log(input);
    socket.emit('message', { chatMessage: input, nickname: 'rafa' });
  });

socket.on('message', (message) => {
  console.log(message);
  const chat = document.getElementById('chat');
  const messageP = document.createElement('p');

  messageP.innerText = message.chatMessage;
  chat.appendChild(messageP);
});
