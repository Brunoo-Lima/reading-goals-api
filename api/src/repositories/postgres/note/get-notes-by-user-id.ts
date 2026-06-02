import { prisma } from '../../../lib/prisma';

export class PostgresGetNotesByUserIdRepository {
  async execute(userId: string, bookId?: string) {
    return await prisma.note.findMany({
      where: {
        user_id: userId,
        ...(bookId && { book_id: bookId }),
      },
    });
  }
}
