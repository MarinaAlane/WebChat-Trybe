function routerChat(req, res) {
  const { arrayMessages } = req.body;
  res.render('index.ejs', { arrayMessages });
}

module.exports = routerChat;
