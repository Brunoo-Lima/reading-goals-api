import bcrypt from 'bcryptjs';

export class SecurityKeyComparatorAdapter {
  async execute(
    securityKey: string,
    hashedSecurityKey: string,
  ): Promise<boolean> {
    const isValid = await bcrypt.compare(securityKey, hashedSecurityKey);
    return isValid;
  }
}
