const joi = require('joi');
const rescue = require('express-rescue');
const messageModel = require('../models/historyModel');

const messageRegister = rescue(async (req, res, next) => {
  const { error } = joi.object({
    message: joi.string().required(),
    nickname: joi.string().required(),
    timestamp: joi.string().required(),
  }).validate(req.body);

  if (error) return next(error);

  const { message, nickname, timestamp } = req.body;

  const result = await messageModel.messageRegister(message, nickname, timestamp);
  if (result.error) return next(result.error);
  return res.status(201).json(result);
});

const getAllMessages = rescue(async (_req, res, next) => {
  const messages = await messageModel.getAllMessages();
  if (messages.error) return next(messages.error);
  return res.status(200).json(messages);
});

module.exports = {
 messageRegister,
 getAllMessages,
};
