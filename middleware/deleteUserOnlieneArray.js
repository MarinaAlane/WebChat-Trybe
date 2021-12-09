function deleteUserOnlieneArray(array, randNameId) {
  const filterArray = array.filter(({ section }) => section !== randNameId);
  return filterArray;
}

module.exports = deleteUserOnlieneArray;
