function formatUser(randNameId, userNickName) {
  let nickNameUser = '';

  if (!userNickName) {
    nickNameUser = randNameId;
  } else {
    nickNameUser = userNickName;
  }
  return nickNameUser;
}

module.exports = formatUser;
