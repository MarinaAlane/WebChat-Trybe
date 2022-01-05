const { getMessagesHistory } = require('../models/chatModel');
// atualizaçao
const getMessages = async (req, res) => {
try {
  const history = await getMessagesHistory();
    res.status(200).render('chatView', { history });
  } catch {
  res.status(500).json({ message: 'deu problema aqui' });
}
};

module.exports = { getMessages };
