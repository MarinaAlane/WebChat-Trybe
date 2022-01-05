const socket = window.io();

const formMessage = document.querySelector('#form-messages');
const inputMessage = document.querySelector('#message-input');
const formName = document.querySelector('#form-nickname');
const inputName = document.querySelector('nickname-input');
const messagesUl = document.querySelector('#messages');
const userList = document.querySelector('#online-users');

const userListClient = [];

const createServerMessage = (message) => {
  const li = document.createElement('li');
  li.innerText = message;
  messagesUl.appendChild(li);
};

const createChatMessage = (chatMessage) => {
  const li = document.createElement('li');
  li.setAttribute('data-testid', 'message');
  li.innerText = chatMessage;
  messagesUl.appendChild(li);
};
