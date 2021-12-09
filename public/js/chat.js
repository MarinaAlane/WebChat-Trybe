const socket = window.io('http://localhost:3000');

const input = document.querySelector('#input-field');
const form = document.querySelector('#form');
const chat = document.querySelector('#chat-container');

const newElement = (element) => document.createElement(element);

const createSection = (className) => {
  const section = newElement('section');
  section.className = className;
  return section;
};

const createDateTime = (className, text) => {
  const span = newElement('span');
  span.className = className;
  span.innerText = text;
  return span;
};

const createAvatar = (className, src) => {
  const avatar = newElement('img');
  avatar.alt = 'Avatar';
  avatar.src = src;
  avatar.className = className;
  return avatar;
};

const createParagraph = (className, nickname, chatMessage) => {
  const newMessage = newElement('p');
  newMessage.className = className;
  newMessage.innerText = `${nickname} - ${chatMessage}`;
  return newMessage;
};

const createMsgContainer = (dateTime, nickname, chatMessage) => {
  const newMessage = createParagraph('message', nickname, chatMessage);
  const avatar = createAvatar('avatar', '../images/avatar1.png');
  const span = createDateTime('time-rigth', dateTime);
  const section = createSection('message-div');
  section.append(avatar, newMessage, span);
  chat.append(section);
};

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // if (input.value) {
    socket.emit('message', { chatMessage: input.value, nickname: 'renan' });
    input.value = '';
    input.focus();
  // }
});

socket.on('message', ({ dateTime, nickname, chatMessage }) => {
  createMsgContainer(dateTime, nickname, chatMessage);
  window.scrollTo(0, document.body.scrollHeight);
});