const chatModel = require('../models/chatModel');

const storeMsg = async ({ nickname, chatMessage }, date) => {
  try {
    await chatModel.storeMsg(nickname, chatMessage, date);
  } catch (error) {
    console.log(error);
  }
};

const getChatHistory = async (_req, res) => {
  try {
    const history = await chatModel.getChatHistory();

    res.status(200).render('chat', { history });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

module.exports = {
  storeMsg,
  getChatHistory,
}; 
