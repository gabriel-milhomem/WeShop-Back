class InvalidDataError extends Error {
  constructor(message, details = 'format error') {
    super(message);

    this.details = details;
    this.name = 'InvalidDataError';
  }
}

module.exports = InvalidDataError;
