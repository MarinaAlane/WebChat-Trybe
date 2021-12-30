const socket = window.io();

const testid = 'data-testid';
const messageForm = document.querySelector('#send-container');
const messageInput = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const nicknameForm = document.querySelector('#nickname-form');
const nicknameList = document.querySelector('#nickname-list');
const nicknameInput = document.querySelector('#nickname-input');

const createListItem = (value, list, attribute = [null, null]) => {
    const listedItem = document.createElement('li');
    listedItem.setAttribute(`${attribute[0]}`, `${attribute[1]}`);
    listedItem.innerText = value;
    list.appendChild(listedItem);
    window.scrollTo(0, document.body.scrollHeight);
};

const makeNickname = (value) => value.slice(0, 16);

socket.on('connect', () => {
    const nickname = makeNickname(socket.id);
    sessionStorage.setItem('nickname', nickname);
    socket.emit('newUser', nickname);
});

socket.on('updateUsersList', (users) => {
    const { [socket.id]: newUser, ...previousUsers } = users;
    nicknameList.innerHTML = '';
    createListItem(newUser, nicknameList, [testid, 'online-user']); // creates the li of the user who logged
    Object.values(previousUsers)
    .forEach((user) => createListItem(user, nicknameList, [testid, 'online-user'])); // creates the li´s for the remaining users stored in the backend object
});

nicknameForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents the page from reloading
    if (nicknameInput.value) {
        socket.emit('updateNickname', nicknameInput.value);
        sessionStorage.setItem('nickname', nicknameInput.value);
    }
    nicknameInput.value = '';
});

messageForm.addEventListener('submit', (e) => {
    e.preventDefault(); // prevents the page from reloading
    if (messageInput.value) {
        socket.emit('message',
        { chatMessage: messageInput.value, nickname: sessionStorage.getItem('nickname') });
    }
    messageInput.value = '';
});

socket.on('message', (msg) => { createListItem(msg, messages, [testid, 'message']); });
