import { prisma } from '../../../../lib/prisma';
import { PostgresGetReadingLogDatesRepository } from '../get-reading-log-dates';

describe('Get Reading Log Dates Repository', () => {
  test('should return reading dates ordered by date', async () => {
    const dates = [new Date('2024-01-02'), new Date('2024-01-01')];

    const sut = new PostgresGetReadingLogDatesRepository();

    const spy = vi
      .spyOn(prisma.readingLog, 'findMany')
      .mockResolvedValueOnce(dates.map((date) => ({ date })) as any);

    await expect(sut.execute('user-id')).resolves.toEqual(dates);

    expect(spy).toHaveBeenCalledWith({
      where: { user_id: 'user-id' },
      select: { date: true },
      orderBy: { date: 'desc' },
    });
  });

  test('should throw if Prisma throws', async () => {
    const sut = new PostgresGetReadingLogDatesRepository();

    vi.spyOn(prisma.readingLog, 'findMany').mockRejectedValueOnce(new Error());

    await expect(sut.execute('user-id')).rejects.toThrow();
  });
});
