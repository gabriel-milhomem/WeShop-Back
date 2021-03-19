class NotFoundError extends Error {
  constructor(entityName) {
    super(`${entityName} not found!`);

    this.name = 'NotFoundError';
  }
}

module.exports = NotFoundError;
