function deleteUserOnlieneArray(array, idsectionUser) {
  const filterArray = array.filter(({ section }) => section !== idsectionUser);
  return filterArray;
}

module.exports = deleteUserOnlieneArray;
