const Messages = require('../models/Messages');

const create = async (nickname, message, timestamp) => {
  await Messages.create(nickname, message, timestamp);
};

const getAll = async () => {
  const messages = await Messages.getAll();
  return messages;
};

module.exports = {
  create,
  getAll,
};