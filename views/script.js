const socket = window.io();

const messageList = document.getElementById('messages');
const onlineUserList = document.getElementById('users');

const insertIntoMessageList = (messages) => {
  messages.forEach(({timestamp, nickname, message}) => {
    const msg = document.createElement('li');
    msg.textContent = `${timestamp} - ${nickname}: ${message}`;
    msg.setAttribute('data-testid', 'message');
    messageList.appendChild(msg);
    window.scrollTo(0, document.body.scrollHeight);
  });
};

const listAllMessages = () => {
  socket.on('messageHistory', (allMessages) => {
    messageList.innerHTML = '';
    insertIntoMessageList(allMessages);
  });
};

listAllMessages();

// ================================== Create User =====================================================

const getChildrenFromUserList = () => {
  const userList = document.getElementById('users');
  return userList.children;
};

const insertIntoUserList = (nickname) => {
  const userList = document.getElementById('users');
  const user = document.createElement('li');

  user.setAttribute('dataTestId', 'online-user');
  user.innerText = nickname;
  userList.appendChild(user);
};

socket.on('getNickname', (nickname) => {
  onlineUserList.innerText = nickname;
  sessionStorage.setItem('nickname', nickname);
  insertIntoUserList(nickname);
});

// ====================================================================================================

// ============================= add logged User into others list =====================================

socket.on('newLogin', (nickname) => {
  insertIntoUserList(nickname);
  const userNickname = onlineUserList.innerText;
  socket.emit('newLogin', userNickname);
});

const isUserInUserList = (nickname) => {
  const allUsers = getChildrenFromUserList();
  allUsers.forEach((user) => {
    if (user.innerText === nickname) return true;
  });
  return false;
};

socket.on('addNewLogin', (nickname) => {
  if (!isUserInUserList(nickname)) insertIntoUserList(nickname);
});

// ====================================================================================================

// const formUsername = document.getElementById('form-username');
// const inputUsername = document.getElementById('input-username');

// let nickname = randomName;

// formUsername.addEventListener('submit', (e) => {
//   e.preventDefault();
//   if (inputUsername.value) {
//     nickname = inputUsername.value;
//     // const usersItems = document.getElementsByClassName('online-user');
//     const userId = socket.id;
//     socket.emit('changeUserName', { id: userId, nickname });
//     inputUsername.value = '';
//     listAllUsersOnline();
//   }
// });

// ================================== Create User =====================================================

// ..source: https://www.geeksforgeeks.org/how-to-detect-browser-or-tab-closing-in-javascript/
// window.addEventListener('beforeunload', (e) => {
//     e.preventDefault();
//     const userId = socket.id;
//     socket.emit('onCloseChat', userId);
//     e.returnValue = '';
//     listAllUsersOnline();
// });

const form = document.getElementById('form');
const input = document.getElementById('input');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // const chatMessage = input.value;
    // socket.emit('message', { nickname, chatMessage });
    input.value = '';
  }
});

// ..source: https://stackoverflow.com/questions/18648500/add-id-class-to-objects-from-createelement-method
const messagesHistory = [];

socket.on('message', (msg) => {
  const messages = document.getElementById('messages');
  const item = document.createElement('li');
  item.textContent = msg;
  messagesHistory.push(msg);
  item.setAttribute('data-testid', 'message');
  sessionStorage.setItem('messages', messagesHistory);
  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});
