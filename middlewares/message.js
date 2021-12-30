const service = require('../services/message');

const getMessages = async (_req, res) => {
  const messages = await service.getMessages();
  return res.render('index', { messages });
};

const addMessage = async (req, res) => {
  const message = req;
  const messages = await service.addMessage(message);
  return res.render('index', { messages });
};

module.exports = {
  getMessages,
  addMessage,
};