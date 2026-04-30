import bcrypt from 'bcryptjs';

export class PasswordHashAdapter {
  execute(password: string) {
    return bcrypt.hash(password, 10);
  }
}
