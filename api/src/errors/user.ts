export class EmailAlreadyInUseError extends Error {
  constructor() {
    super(`Email already exists`);
    this.name = 'EmailAlreadyInUseError';
  }
}

export class UserNotFoundError extends Error {
  constructor(userId?: string) {
    super(`User ${userId ? `with id ${userId} ` : ''}not found`);
    this.name = 'UserNotFoundError';
  }
}
