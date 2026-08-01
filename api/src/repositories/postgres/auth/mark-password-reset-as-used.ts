import { prisma } from '../../../lib/prisma';

export class PostgresMarkPasswordResetAsUsedRepository {
  async execute(token: string): Promise<void> {
    await prisma.passwordReset.update({
      where: { token },
      data: { used_at: new Date() },
    });
  }
}
