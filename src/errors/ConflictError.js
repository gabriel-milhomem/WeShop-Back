class ConflictError extends Error {
  constructor(entityName) {
    super(`${entityName} já existe!`);
    this.name = 'ConflictError';
  }
}

module.exports = ConflictError;
