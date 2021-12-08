const { getMessages } = require('../models/messages');

const showChat = async (_req, res) => {
  const messages = await getMessages();
  return res.status(200).render('index', { messages });
};

module.exports = { 
  showChat, 
};