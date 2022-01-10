const msgModel = require('../models/messages');

const getAllMessages = async (req, res) => {
  try {
    const getMessages = await msgModel.getAllMessages();
    return res.render('index.ejs', { getMessages });      
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
};

module.exports = getAllMessages;