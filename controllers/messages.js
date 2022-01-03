const Message = require('../service/message');

const getAll = async () => {
  try {
    const msg = await Message.getAll();
    return msg;
  } catch (error) {
    console.log('Error', error);
  }
};

const saveHistory = async (message) => {
  try {
    await Message.saveHistory(message);
    return true;
  } catch (error) {
    console.log('Error', error);
  }
};

module.exports = {
  getAll,
  saveHistory,
};
