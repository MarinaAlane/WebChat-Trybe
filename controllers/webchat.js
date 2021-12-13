exports.getChat = (req, res, next) => {
  try {
    res.render('pages/webchat', { extractScripts: true });
  } catch (error) {
    next(error);
  }
};
