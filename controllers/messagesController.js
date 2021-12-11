const messagesModel = require('../models/messagesModel');

const getAll = async (_req, res) => {
  const allMessages = await messagesModel.getAll();
  return res.status(200).json(allMessages);
};

const createMessage = async (req, res) => {
  messagesModel.createMessage(req.body);
  console.log(req.body);
  return res.status(201).json({ message: 'Message Create' });
};

module.exports = { getAll, createMessage };