const model = require('../models/Chat');

const saveMessage = async (req, res) => {
  const { message, nickname, timestamp } = req.body;

  await model.saveMessage(message, nickname, timestamp);

  res.status(201).json({ message: 'Mensagem salva' });
};

const getMessages = async (_req, res) => {
  const messages = await model.getMessages();

  res.status(200).json(messages);
};

module.exports = {
  saveMessage,
  getMessages,
};
