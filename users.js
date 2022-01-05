const arrayListUser = [];

const addUser = (nickname, socket) => {
  arrayListUser.push({
    nickname,
    id: socket.id,
  });
  return arrayListUser;
};

const editUser = (nickname, socket) => {
    const index = arrayListUser.findIndex((item) => item.id === socket.id);
    arrayListUser[index] = nickname;
    return arrayListUser;
};
const getUsers = () => arrayListUser;

const deleteUser = (socket) => {
    const index = arrayListUser.findIndex((item) => item.id === socket.id);
    arrayListUser.splice(index, 1);
    return arrayListUser;
    };

module.exports = {
    addUser,
    editUser,
    getUsers,
    deleteUser,
};

// git push para vaildaçao do do recesso da trybe