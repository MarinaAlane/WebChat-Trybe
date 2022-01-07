const renderChat = async (req, res, next) => {
  try {

    return res.render('webchat', { tmp: 'hi baby' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  renderChat,
};