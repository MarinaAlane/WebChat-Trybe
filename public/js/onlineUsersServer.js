let onlineUsersList = [];

const getList = () => onlineUsersList;

const addUser = (userId) => {
  const list = getList();
  list.push({ userId, nickname: userId });
  onlineUsersList = list;
};

const delUser = (id) => {
  const list = getList().filter((user) => user.userId !== id);
  onlineUsersList = list;
};

const changeNickname = (nickname, userId) => {
  const list = getList();
  const newList = list.map((user) => {
    if (user.userId === userId) {
      return { ...user, nickname };
    }
    return user;
  });
  onlineUsersList = newList;
};

module.exports = () => ({
    getList,
    addUser,
    delUser,
    changeNickname,
});
