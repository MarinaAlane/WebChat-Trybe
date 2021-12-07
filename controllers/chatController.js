const chatModel = require('../models/chatModel');

const getHistoryMessages = async (req, res) => {
  const { message, nickname, timestamp } = await chatModel.getHistoryMessages();

  res.status(200).render('chatView', { message, nickname, timestamp });
};

module.exports = {
  getHistoryMessages,
};