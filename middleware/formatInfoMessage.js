const time = require('./getTime');

function formatUser(idsectionUser, message) {
  let nickNameUser = '';

  if (!message.nickname) {
    nickNameUser = idsectionUser;
  } else {
    nickNameUser = message.nickname;
  }
  return {
    message: message.chatMessage,
    nickname: nickNameUser,
    timestamp: time(),
  };
}

module.exports = formatUser;
