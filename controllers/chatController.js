const chatModel = require('../models/chatModel');

// ROTA GET
const getMessagesHistory = async (req, res) => {
  const history = await chatModel.getMessagesHistory();
  res.status(200).render('chatView', { history });
};

// ROTA POST
const postMessage = async (message, nickname, timestamp) => {
  await chatModel.postMessage(message, nickname, timestamp);
};

module.exports = {
  getMessagesHistory,
  postMessage,
};
