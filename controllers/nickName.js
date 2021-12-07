const models = require('../models/nickName');

const createUser = async (req, res) => {
  try {
    const createdUser = await models.createUser();
    console.log(createdUser);
  } catch (error) {
    console.error(error.message);
    return res.status(401).json({ message: error.message });
  }
};

module.exports = { 
  createUser,
};