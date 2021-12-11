const generateMessage = ({ nickname, chatMessage }) => ({
  nickname,
  chatMessage,
  createdAt: new Date().toLocaleString(),
});

module.exports = { generateMessage };
