const { getAllMessages } = require('../models/history');

const getHistory = async (_req, res) => {
  try {
    const history = await getAllMessages();
    return history;
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = { getHistory };