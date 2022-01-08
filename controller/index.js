const model = require('../models/index');

const saveMessage = async (req, res) => {
  const { message, nickname, id } = req.body;
  await model.saveMessage({ message, nickname, id });
  return res.status(201).send('Message saved');
};

module.exports = {
  saveMessage,
};
