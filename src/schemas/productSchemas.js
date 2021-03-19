const Joi = require('joi');

const create = Joi.object({
  name: Joi.string().trim().required(),
  price: Joi.number().integer().min(0).required()
});

module.exports = {
  create
};
