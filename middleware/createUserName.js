// ..Source: https://attacomsian.com/blog/javascript-generate-random-string

const createUserName = () => {
  const userName = Math.random().toString(36).substr(2, 8);
  return userName + userName;
};

module.exports = {
  createUserName,
};
