const { getMessages } = require('../models/chat');

const getFullChat = async (req, res) => {
  try {
    const messages = await getMessages();
    res.status(200).render('index', { messages });
  } catch (e) {
    res.status(404).json({ message: 'Not found' });
  }
};

module.exports = { getFullChat };