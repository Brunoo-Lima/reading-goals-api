import bcrypt from 'bcryptjs';

export class SecurityKeyComparatorAdapter {
  async execute(
    securityKey: string,
    userSecurityKey: string,
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(securityKey, userSecurityKey);
    return isValid;
  }
}
