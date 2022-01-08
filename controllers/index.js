const modelMsg = require('../models/messages');

const getAllMessages = async (_req, res) => {
  try {
    const allMsg = await modelMsg
      .getAllMessages();
    return res.render('index.ejs', { allMsg });
  } catch (error) {
    return res.status(500)
      .json({ message: error.message });
  }
};

module.exports = getAllMessages;
