const Joi = require("joi");

const personalDataSchema = Joi.object({
  height: Joi.number().integer().min(100).max(250).required(),
  age: Joi.number().integer().min(10).max(120).required(),
  currentWeight: Joi.number().integer().min(30).max(300).required(),
  desiredWeight: Joi.number().integer().min(30).max(300).required(),
  bloodType: Joi.number().integer().min(1).max(4).required(),
});

module.exports = {
  personalDataSchema,
};
