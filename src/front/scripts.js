const testIds = {
    onlineUser: '[data-testid="online-user"]',
    messageBox: '[data-testid="message-box"]',
    nickNameBox: '[data-testid="nickname-box"]',
    nickNameButton: '[data-testid="nickname-button"]',
    sendButton: '[data-testid="send-button"]',
};

const socket = window.io();

function setSessionUser(nickName) {
    sessionStorage.setItem('webChatUser', nickName);
}

function randomNickNameUser() {
    const nickName = (Math.floor(Math.random() * 10 ** 16)).toString();
    setSessionUser(nickName);
    return nickName;
}

function renderUser(nickName) {
    const onlineUsersUl = document.getElementById('online-user');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'online-user');
    li.innerText = nickName;

    onlineUsersUl.appendChild(li);
}

function getAllLoggedUsers() {
    const allUsers = [];

    document.querySelectorAll(testIds.onlineUser)
        .forEach((child) => allUsers.push(child.innerText));

    return allUsers;
}

function renderNickName() {
    const nickName = randomNickNameUser();
    renderUser(nickName);
    socket.emit('userSignIn', nickName);
}

function renderMessageList(message) {
    const messagesUl = document.getElementById('messages');
    const li = document.createElement('li');
    li.setAttribute('data-testid', 'message');
    li.innerText = message;

    messagesUl.appendChild(li);
}

function sendNewMessage() {
    const nickname = document.querySelector(testIds.onlineUser).innerText;
    const chatMessage = document.querySelector(testIds.messageBox).value;
    socket.emit('message', { chatMessage, nickname });
    document.querySelector(testIds.messageBox).value = '';
}

function changeNickName(nickName) {
    const onlineUserNickName = document.querySelector(testIds.onlineUser);

    onlineUserNickName.innerText = nickName;
    setSessionUser(nickName);
}

function removeUser(nickName) {
    const allUsers = getAllLoggedUsers();

    allUsers
        .filter((user) => user !== nickName)
        .forEach((user) => renderUser(user));
}

document.querySelector(testIds.nickNameButton).addEventListener('click', (e) => {
    e.preventDefault();
    const nickNameTag = document.querySelector(testIds.nickNameBox);
    const nickNameValue = nickNameTag.value;
    changeNickName(nickNameValue);
    socket.emit('userSignIn', nickNameValue);
    nickNameTag.value = '';
});

document.querySelector(testIds.sendButton).addEventListener('click', (e) => {
    e.preventDefault();
    sendNewMessage();
});

socket.on('message', (message) => {
    renderMessageList(message);
});

socket.on('loadMessages', (messages) => {
    document.getElementById('messages').innerHTML = '';
    messages.forEach(({ message, nickname, timestamp }) => {
        renderMessageList(`${timestamp} - ${nickname}: ${message}`);
    });
});

socket.on('userSignIn', (nickName) => {
    renderUser(nickName);
    socket.emit('loggedUsers', sessionStorage.getItem('webChatUser'));
});

socket.on('loggedUsers', (loggedUser) => {
    const allUsers = getAllLoggedUsers();

    if (allUsers.includes(loggedUser)) return;
    
    renderUser(loggedUser);
});

socket.on('removeUser', (userNickName) => {
    const allUsers = getAllLoggedUsers();

    document.getElementById('online-user').innerHTML = '';

    allUsers.forEach((user) => {
        if (user === userNickName) return;

        renderUser(user);
    });
});

function loadMessages() {
    socket.emit('loadMessages');
}

window.onload = () => {
    renderNickName();
    loadMessages();
};