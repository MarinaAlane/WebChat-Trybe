const Messages = require('../models/messagesModel');

const listMessages = async (req, res) => {
    const messages = await Messages.getAll();

    res.status(200).render('chat', { messages });
};

module.exports = {
  listMessages,
};
