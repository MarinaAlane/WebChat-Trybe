const startChat = async (req, res) => {
  res.status(200).render('start');
};

module.exports = { startChat };
