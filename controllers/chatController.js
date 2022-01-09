const startChat = async (req, res) => {
  res.status(200).render('chat');
};

module.exports = { startChat };
