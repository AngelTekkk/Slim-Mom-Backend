const Joi = require("joi");

const dailyIntakeJoiSchema = Joi.object({
  height: Joi.number().min(100).max(300).required(),
  age: Joi.number().min(6).max(130).required(),
  currentWeight: Joi.number().min(40).max(270).required(),
  desiredWeight: Joi.number().min(40).max(270).required(),
  bloodType: Joi.number().min(1).max(4).required(),
});

module.exports = {
  dailyIntakeJoiSchema,
};
