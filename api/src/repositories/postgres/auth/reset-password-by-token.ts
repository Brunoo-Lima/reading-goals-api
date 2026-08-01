import { prisma } from '../../../lib/prisma';

export class PostgresResetPasswordByTokenRepository {
  async execute(token: string) {
    return await prisma.passwordReset.findUnique({
      where: { token },
    });
  }
}
