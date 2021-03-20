const Joi = require('joi');

const create = Joi.object({
  clientId: Joi.number().integer().required(),
  orders: Joi.array().items(
    Joi.object().keys({
      productId: Joi.number().integer().required(),
      quantity: Joi.number().integer().min(1).required()
    })
  )
});

const update = create;

module.exports = {
  create,
  update
};
