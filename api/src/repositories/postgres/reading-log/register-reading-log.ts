import type { IReadingLog } from '../../../@types/IReadingLog';
import { prisma } from '../../../lib/prisma';

export class PostgresRegisterReadingLogRepository {
  async execute(readingLog: IReadingLog) {
    return await prisma.$transaction(async (tx) => {
      const log = await tx.readingLog.create({
        data: readingLog,
      });

      await tx.book.update({
        where: { id: readingLog.book_id },
        data: {
          current_page: {
            increment: readingLog.pages_read,
          },
        },
      });

      return log;
    });
  }
}
