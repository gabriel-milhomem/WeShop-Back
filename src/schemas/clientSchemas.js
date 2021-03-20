const Joi = require('joi');

function validateDate(value, helpers) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value);
  if (match) {
    const day = parseInt(match[1]);
    const month = parseInt(match[2]);
    const year = parseInt(match[3]);

    const date = new Date(year, month - 1, day);
    const dateValid =
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day;

    if (!dateValid) {
      return helpers.message('Data inválida');
    }

    return value;
  }

  return helpers.message('Data inválida');
}

const create = Joi.object({
  name: Joi.string()
    .pattern(/^[A-z\u00C0-\u00ff ]+$/, 'validate letters and accent')
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(
      /^(\(\d{2}\)\s)(\d{4,5}-\d{4})$/,
      'validate phone to (99) 99999-9999'
    )
    .required(),
  birthDate: Joi.string().custom(validateDate).required()
});

module.exports = {
  create
};
