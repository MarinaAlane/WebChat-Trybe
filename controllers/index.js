const modelMessage = require('../models/messages');

const getAllMessages = async (req, res) => {
  try {
    const allMessages = await modelMessage.getAllMessages();
    return res.render('index.ejs', { allMessages });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = getAllMessages;
