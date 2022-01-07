const ApiErrors = require('../errors/ApiErrors');

module.exports = (schema) => {
  return (req, _res, next) => {
    const { error } = schema.validate(req.body);
  
    if (error) {
      const { details: [{ message }] } = error;
      next(ApiErrors.badRequest(message));
    }
    next();
  }
};