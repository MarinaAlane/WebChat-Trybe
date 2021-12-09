module.exports = (array, newNickname, oldNickname) => 
  array.map((user) => { 
    if (user.randomNickname === oldNickname) {
      return { randomNickname: newNickname, id: user.id };
    }
    return user;
  });