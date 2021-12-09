const { getAll } = require('../models/messages');

const getAllMessages = async (req, res) => {
try {
  const history = await getAll();
    res.status(200).render('client', { history });
  } catch {
  res.status(500).json({ message: 'sorry' });
}
};

module.exports = { getAllMessages };
