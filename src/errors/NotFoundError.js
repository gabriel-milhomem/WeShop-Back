class NotFoundError extends Error {
  constructor(entityName) {
    super(`${entityName} não encontrado!`);

    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
