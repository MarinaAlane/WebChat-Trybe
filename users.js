const arrayListUser = [];

const addUser = (nickname, socket) => {
  arrayListUser.push({
    nome: nickname,
    id: socket.id,
  });
  return arrayListUser;
};

const editUser = (nickname, socket) => {
    const index = arrayListUser.findIndex((item) => item.id === socket.id);
    arrayListUser[index].nome = nickname;
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