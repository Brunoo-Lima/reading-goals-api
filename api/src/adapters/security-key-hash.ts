import bcrypt from 'bcryptjs';

export class SecurityKeyHashAdapter {
  execute(securityKey: string) {
    return bcrypt.hash(securityKey, 10);
  }
}
