const { webchat } = require('../models');

exports.getChat = async (req, res, next) => {
  try {
    const oldMessages = await webchat.getMessages();
    res.render('pages/webchat', { extractScripts: true, oldMessages });
  } catch (error) {
    next(error);
  }
};
