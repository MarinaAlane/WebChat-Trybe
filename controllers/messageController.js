const messageModel = require('../models/messageModel');

const saveMessage = async (message, nickname, date) => {
  try {
    await messageModel.saveMessage(message, nickname, date); 
  } catch (error) {
    console.log(error);  
  }
};

const getHistory = async (_req, res) => {
  const allMessages = await messageModel.getHistory();
  try {
    return res.status(200).render('webchat', { allMessages });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  saveMessage,
  getHistory,
};
