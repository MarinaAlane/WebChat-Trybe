const Joi = require('joi');

module.exports = Joi.object({
  displayName: Joi.string().required(),
});