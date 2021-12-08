const { saveMsg, getAll } = require('../models/messages');

const getAllMessages = async (_req, res) => {
  try {
    const response = await getAll();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const saveMessage = async (req, res) => {
  try {
    const response = await saveMsg(req.body);
    res.status(200).json({ response });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  saveMessage,
  getAllMessages,
};
