import { prisma } from '../../../lib/prisma';

export class PostgresGetUserByEmailRepository {
  async execute(email: string) {
    return await prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
