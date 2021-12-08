function formatUser(randNameId, message) {
  let nickNameUser = '';

  if (!message.nickname) {
    nickNameUser = randNameId;
  } else {
    nickNameUser = message.nickname;
  }
  return nickNameUser;
}

module.exports = formatUser;
