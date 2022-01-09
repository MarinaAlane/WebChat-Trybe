const messageModel = require('../models/messageModel');

const getAllMessages = async (_req, res) => {
  try {
    const returnedMessages = await messageModel.getAllMessages();

    return res.render('index.ejs', { returnedMessages });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = getAllMessages;
