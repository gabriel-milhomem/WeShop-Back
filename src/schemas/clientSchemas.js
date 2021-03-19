const Joi = require('joi');

const create = Joi.object({
  name: Joi.string()
    .pattern(/^[A-z\u00C0-\u00ff ]+$/)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/,
      'validate phone to (99) 99999-9999'
    )
    .required(),
  birthDate: Joi.string()
    .pattern(/^(\d{2})\/(\d{2})\/(\d{4})$/)
    .required()
});

module.exports = {
  create
};
