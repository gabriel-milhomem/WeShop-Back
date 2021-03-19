const InvalidDataError = require('../errors/InvalidDataError');

function schemaMiddleware(schema) {
  return function (req, res, next) {
    const validation = schema.validate(req.body);

    if (validation.error) {
      throw new InvalidDataError(
        'Não foi possível processar os dados!',
        validation.error.details.map(e => e.message)
      );
    }

    next();
  };
}

module.exports = schemaMiddleware;
