const chatModel = require('../models/chatModel');

async function saveMessages({ nickname, chatMessage }, date) {
  try {
    await chatModel.saveMessages(nickname, chatMessage, date);
  } catch (error) {
    console.log(error);
  }
}

async function getMessages(_req, res) {
  try {
    const result = await chatModel.getMessages();
    res.status(200).render('chat', { result });
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  saveMessages,
  getMessages,
};