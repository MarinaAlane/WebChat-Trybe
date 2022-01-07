module.exports = () => {
  // nesse caso nao é preciso de um observer, mas se mais implementacoes forem feitas talvez...
  let onlineUsersList = [];

  const getList = () => onlineUsersList;

  const addUser = (userId) => {
    const list = getList();
    list.push({ userId });
    onlineUsersList = list;
  };

  const delUser = (id) => {
    const list = getList().filter((user) => user.userId !== id);
    onlineUsersList = list;
  };

  return {
    getList,
    addUser,
    delUser,
  }
}
