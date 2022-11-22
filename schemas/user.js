const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .min(2)
    .max(40)
    .required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().min(6).required(),
});

const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

// const resendEmailSchema = Joi.object({
//   email: Joi.string()
//     .email({
//       minDomainSegments: 2,
//     })
//     .required(),
// });

module.exports = {
  registerSchema,
  loginSchema,
  refreshSchema,
  // resendEmailSchema,
};
