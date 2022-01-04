const Models = require('../models/Messages');

const create = async (message) => {
  const newMessage = await Models.create(message);
  return newMessage;
};

const getAll = async () => {
  const messages = await Models.getAll();
  return messages;
};

module.exports = {
  create,
  getAll,
};
