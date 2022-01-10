const messagesModel = require('../models/messages');

const getAllMessages = async (req, res) => {
  try {
    const messages = await messagesModel.getAllMessages();

    return res.status(200).json(messages);
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

const insertMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) throw new Error('Message empty');

    await messagesModel.insertMessage(message);

    return res.status(201).json({ message: 'Message created!' });
  } catch (e) {
    return res.status(400).json({ message: e.message });
  }
};

module.exports = {
  getAllMessages,
  insertMessage,
};
