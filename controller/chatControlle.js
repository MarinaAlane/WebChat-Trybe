const chatRender = async (req, res) => {
  const messages = [];
  return res.status(200).render('index', { messages });
};

module.exports = { chatRender };