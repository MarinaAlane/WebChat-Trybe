const socket = window.io();

const testid = 'data-testid';
const form = document.querySelector('#send-container');
const input = document.querySelector('#message-input');
const messages = document.querySelector('#messages');
const nicknameList = document.querySelector('#nickname-list');

const createListItem = (value, list, attribute = [null, null]) => {
    const listedItem = document.createElement('li');
    listedItem.setAttribute(`${attribute[0]}`, `${attribute[1]}`);
    listedItem.innerText = value;
    list.appendChild(listedItem);
    window.scrollTo(0, document.body.scrollHeight);
};

form.addEventListener('submit', (e) => {
    e.preventDefault(); // previne recarregamento da página
    if (input.value) {
        socket.emit('message', { chatMessage: input.value, nickname: socket.id });
    }
    input.value = '';
});

const formNickname = (value) => value.slice(0, 16);

socket.on('connect', () => {
    const nickname = formNickname(socket.id);
    console.log(nickname.length);
    socket.emit('newUser', nickname);
});

socket.on('updateUserList', (users) => {
    const { [socket.id]: newUser, ...previousUsers } = users;
    nicknameList.innerHTML = '';
    createListItem(newUser, nicknameList, [testid, 'online-user']);
    Object.values(previousUsers)
    .forEach((user) => createListItem(user, nicknameList, [testid, 'online-user']));
});

// });
            
socket.on('message', (msg) => { createListItem(msg, messages, [testid, 'message']); });
