const chatModel = require('../models/chatModel');

const getMessage = async (_req, res) => {
  const chat = await chatModel.getMessages();
  if (!chat) {
    return res.status(400)
      .render('socket', { messages: 'Mensagens não encontradas' });
  }
  res.status(200).render('socket', { chat });
};

const create = async (req, res) => {
  try {
    const { message, nickname, timestamp } = req;
    const msg = await chatModel.create({ message, nickname, timestamp });
    return msg;
  } catch (error) {
    res.status(400).json({ message: 'Algo deu errado.Tente novamente mais tade.' });
    console.error(error);
  }
};

module.exports = {
  getMessage,
  create,
}; 