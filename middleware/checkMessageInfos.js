const time = require('./getTime');

function checkMessageInfos(messageInfos, randNameId) {
  const { nickname, chatMessage } = messageInfos;
  let newNickName = '';

  if (!nickname) {
    newNickName = randNameId;
  } else {
    newNickName = nickname;
  }

  return {
    nickname: newNickName,
    message: chatMessage,
    timestamp: time,
  };
}

module.exports = checkMessageInfos;
