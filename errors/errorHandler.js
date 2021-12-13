const AppError = require('./AppError');

const errorHandler = (errorObj, res) => {
  if (errorObj instanceof AppError) {
    console.log(errorObj);
    return res.send(`Error:
    code: ${errorObj.code}
    message: ${errorObj.message}`);
  }
  console.error(errorObj);
  return res.status(500).end();
};

module.exports = errorHandler;
