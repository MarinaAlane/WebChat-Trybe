const messagesModel = require('../models/messages');

const getAllMessages = async (req, res) => {
  const allMessages = await messagesModel.getAllMessages();
  return res.status(200).send(allMessages);
};

const insertMessage = async (req, res) => {
  const { message, nickname, timestamp } = req.body;
  const newMessage = await messagesModel.getAllMessages(message, nickname, timestamp);
  return res.status(201).json({ newMessage });
};

module.exports = {
  getAllMessages,
  insertMessage,
};