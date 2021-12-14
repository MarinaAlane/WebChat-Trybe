const { postNewMessagesModel, getAllModels } = require('../models/messages');

const getAllController = () => getAllModels();

const postNewMessagesController = (obj) => postNewMessagesModel(obj);

module.exports = {
  postNewMessagesController,
  getAllController,
};