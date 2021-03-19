const NotFoundError = require('../errors/NotFoundError');
const InvalidDataError = require('../errors/InvalidDataError');
const ConflictError = require('../errors/ConflictError');

function errorHandlerMiddleware(error, req, res, next) {
  console.error(error);
  const { message } = error;

  if (error instanceof NotFoundError) {
    return res.status(404).json({ message });
  }

  if (error instanceof InvalidDataError) {
    return res.status(422).json({ message, details: error.details });
  }

  if (error instanceof ConflictError) {
    return res.status(409).json({ message });
  }

  return res.status(500).json({ message: 'Erro interno no servidor' });
}

module.exports = errorHandlerMiddleware;
