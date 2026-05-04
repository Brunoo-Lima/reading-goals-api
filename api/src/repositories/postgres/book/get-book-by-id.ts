import { prisma } from '../../../lib/prisma';

export class PostgresGetBookByIdRepository {
  async execute(bookId: string) {
    return await prisma.book.findFirst({
      where: {
        id: bookId,
      },
    });
  }
}
