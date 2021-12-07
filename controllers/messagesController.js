const messagesModel = require('../models/messagesModel');

const getMessage = async (req, res) => {
  const messages = await messagesModel.getAll();

  if (!messages) {
    return res.status(400)
      .render('messagesList', { message: 'Mensagens não encontradas' }); 
  }

  res.status(200).render('messagesList', { messages });
};

module.exports = {
  getMessage,
};