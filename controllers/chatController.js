const {
  create,
  getAll,
} = require('../models/chatModel.js');

const createMessage = async (message) => {
  try {
    const response = await create(message);
    return response;
  } catch (error) {
    console.log(error);
  }
};

const getAllMessages = async () => {
  try {
    const response = await getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllMessages,
  createMessage,
};
