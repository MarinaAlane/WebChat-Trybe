const Model = require('../models/Message');

const createNewMessage = (content) => Model.create(content);

const getAll = () => Model.getAll();

module.exports = {
  createNewMessage,
  getAll,
};
