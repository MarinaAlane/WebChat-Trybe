const messageModel = require('../models/message');

const createMessage = async ({ nickname, chatMessage }, date) => {
  // date = new Date();
  try {
    await messageModel.createMessage(nickname, chatMessage, date);
  } catch (error) {
    console.log(error);
  }
};

const getAllMessage = async (_req, res) => {
  try {
    const history = await messageModel.getAllMessage();

    res.status(200).render('message', { history });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'internal server error' });
  }
};

module.exports = {
  createMessage,
  getAllMessage,
};