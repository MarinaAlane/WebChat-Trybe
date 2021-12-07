let usersOnline = [];
module.exports = (action, payload) => {
  if (action === 'add') {
    usersOnline.push(payload);
  }
  if (action === 'remove') {
    const newUsersOnline = usersOnline.filter((user) => user.id !== payload);
    usersOnline = newUsersOnline;
  }
  if (action === 'update') {
    usersOnline[payload.index].nickname = payload.newNickname; 
  }
  return usersOnline;
};