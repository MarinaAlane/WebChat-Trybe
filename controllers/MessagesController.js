const MessagesModel = require('../models/Messages');

module.exports = {
  getAll: async (_req, res) => {
    try {
      const messages = await MessagesModel.getAll();
  
      return res.status(200).render('index', { messages });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};
