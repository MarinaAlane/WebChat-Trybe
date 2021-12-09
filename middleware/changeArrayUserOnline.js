function changeArrayUserOnline(array, randNameId, nickname) {
  const newArray = array;
  const index = array.map(({ section }) => section).indexOf(randNameId);
  newArray[index].userNickName = nickname;
  return newArray;
}

module.exports = changeArrayUserOnline;
