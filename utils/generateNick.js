const generateNickname = async () => {
  let nick = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  for (let i = 0; i < 16; i += 1) {
    nick += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return nick;
};

module.exports = generateNickname;
