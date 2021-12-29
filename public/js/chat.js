const socket = window.io();

const form = document.querySelector('#send-container');
const input = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const nicknameList = document.querySelector('#nickname-list');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // previne recarregamento da página
    if (input.value) {
        socket.emit('message', { chatMessage: input.value, nickname: socket.id });
    }
    input.value = '';
});

const createListItem = (value, list) => {
    const listedItem = document.createElement('li');
    listedItem.innerText = value;
    list.appendChild(listedItem);
    window.scrollTo(0, document.body.scrollHeight);
};

socket.on('connect', () => {
    const nickname = socket.id;
    socket.emit('newUser', nickname);
});

socket.on('user', (users) => {
    const { [socket.id]: newUser, ...previousUsers } = users;
    nicknameList.innerHTML = '';
    createListItem(newUser, nicknameList);
    Object.values(previousUsers).forEach((user) => createListItem(user, nicknameList));
});

// });
            
socket.on('message', (msg) => { createListItem(msg, messages); });
