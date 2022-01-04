const socket = window.io();

const onlineUserList = document.getElementById('users');

// ================================== User Form manipulation ===========================================

const nicknameBtn = document.getElementById('nickname-button');

nicknameBtn.addEventListener('click', () => {
  const getNicknameFromInput = document.getElementById('nickname-box');
  const nickname = getNicknameFromInput.value;
  onlineUserList.innerText = nickname;

  sessionStorage.setItem('nickname', nickname);
  socket.emit('changeUserName', nickname);
  getNicknameFromInput.value = '';
});

// ====================================================================================================

// =========================================== Create User ============================================

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

// ================================== update User =====================================================

socket.on('changeUserName', ({ oldNickname, newNickname }) => {
  const allUsers = getChildrenFromUserList();
  for (let index = 0; index < allUsers.length; index += 1) {
    if (allUsers[index].innerText === oldNickname) {
      allUsers[index].innerText = newNickname;
      break;
    }
  }
});

// ====================================================================================================

// ================================== remove User =====================================================

// ..source: https://www.geeksforgeeks.org/how-to-detect-browser-or-tab-closing-in-javascript/

socket.on('removeUserNickname', (nickname) => {
  const allUsers = getChildrenFromUserList();

  for (let index = 0; index < allUsers.length; index += 1) {
    if (allUsers[index].innerText === nickname) {
      allUsers[index].remove();
      break;
    }
  }
});

// ====================================================================================================
