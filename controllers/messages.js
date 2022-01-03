const { getAll } = require('../models/messages');

const getMessages = async (_req, res) => {
  try {
    const messages = await getAll();
    res.status(200).render('client', { messages });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

module.exports = {
  getMessages,
};
