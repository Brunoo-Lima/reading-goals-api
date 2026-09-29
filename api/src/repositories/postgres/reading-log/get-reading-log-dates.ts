import { prisma } from '../../../lib/prisma';

export class PostgresGetReadingLogDatesRepository {
  async execute(userId: string) {
    const readingLogs = await prisma.readingLog.findMany({
      where: { user_id: userId },
      select: { date: true },
      orderBy: { date: 'desc' },
    });

    return readingLogs.map(({ date }) => date);
  }
}
