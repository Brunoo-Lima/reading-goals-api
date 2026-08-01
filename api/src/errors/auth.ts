export class InvalidPasswordError extends Error {
  constructor() {
    super(`Invalid password`);
    this.name = 'InvalidPasswordError';
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super(`Unauthorized`);
    this.name = 'UnauthorizedError';
  }
}

export class InvalidTokenError extends Error {
  constructor() {
    super(`Invalid token`);
    this.name = 'InvalidTokenError';
  }
}

export class ExpiredTokenError extends Error {
  constructor() {
    super(`Expired token`);
    this.name = 'ExpiredTokenError';
  }
}
