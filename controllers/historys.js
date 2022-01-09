// const { getAllMessages } = require('../models/history');

const getHistory = async (_req, _res) => {
  // try {
  //   const history = await getAllMessages();
  //   res.status(200).render('index', { history });
  // } catch (e) {
  //   console.log('deu ruim', e)
  // }
  console.log('Rodando o contoller');
};

module.exports = { getHistory };