const newMessage = (req, res) => {
  const { nickname, chatMessage } = req.body;
  console.log(nickname, chatMessage);

  res.render('main');
};

module.exports = {
  newMessage,
};
