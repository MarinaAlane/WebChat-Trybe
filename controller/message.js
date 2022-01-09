const model = require('../models/messages');

const getAll = async () => {
  const result = await model.getAll();
  return result;
};

module.exports = {
  getAll,
};