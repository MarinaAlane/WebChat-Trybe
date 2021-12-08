const getMessages = require('../models/getMessages');

async function getMessageChat(req, res, next) {
  try {
    const getMsg = await getMessages();
    req.body.arrayMessages = getMsg;
    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
}

module.exports = getMessageChat;
