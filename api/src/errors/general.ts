export class ForbiddenError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ForbiddenError';
  }
}

export class DataInvalidError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DataInvalidError';
  }
}
