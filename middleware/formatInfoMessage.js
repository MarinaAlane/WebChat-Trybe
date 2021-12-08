const time = require('./getTime');

function formatUser(randNameId, message) {
  let nickNameUser = '';

  if (!message.nickname) {
    nickNameUser = randNameId;
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
