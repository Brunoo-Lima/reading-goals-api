export class EmailAlreadyInUseError extends Error {
  constructor(email: string) {
    super(`Email ${email} already in use`);
    this.name = 'EmailAlreadyInUseError';
  }
}

export class UserNotFoundError extends Error {
  constructor(userId?: string) {
    super(`User ${userId ? `with id ${userId} ` : ''}not found`);
    this.name = 'UserNotFoundError';
  }
}
