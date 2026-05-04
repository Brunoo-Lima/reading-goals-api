import { prisma } from '../../../lib/prisma';

export class PostgresGetBooksByUserIdRepository {
  async execute(userId: string) {
    return await prisma.book.findMany({
      where: {
        user_id: userId,
      },
    });
  }
}
