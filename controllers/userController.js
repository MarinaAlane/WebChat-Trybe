const messageModel = require('../models/messagesModel');

const getHistory = async (req, res) => {
  try {
    const messagesHistory = await messageModel.historyMessages();
    res.render('main', { messages: messagesHistory });
  } catch (e) {
    res.render('main', {
      messages: [],
      errorMessage: 'Não foi possível recuperar o historico de mensagens',
    });
  }
};

module.exports = {
  getHistory,
};
