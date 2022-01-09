const chatModel = require('../models/chatModel');

const getMessage = async (_req, res) => {
  const messages = await chatModel.getMessages();
  if (!messages) {
    return res.status(400)
      .render('chat', { messages: 'Mensagens não encontradas' });
  }
  res.status(200).render('chat', { messages });
};

const create = async (req, res) => {
  try {
    const { message, nickname, timestamp } = req;
    const msg = await chatModel.create({ message, nickname, timestamp });
    return msg;
  } catch (error) {
    res.status(400).json({ error: 'Algo deu errado.Tente novamente mais tade.' });
    console.error(error);
  }
};

module.exports = {
  getMessage,
  create,
}; 