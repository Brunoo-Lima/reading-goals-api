import {
  user as fakeUser,
  book as fakeBook,
  readingLog as fakeReadingLog,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresGetReadingLogRepository } from '../get-reading-log';

describe('Get Reading Log Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetReadingLogRepository();

  test('should get reading log on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const book = await prisma.book.create({
      data: {
        ...fakeBook,
        user_id: userData.id,
      },
    });

    const readingLog = {
      ...fakeReadingLog,
      pages_read: 40,
      user_id: userData.id,
      book_id: book.id,
    };

    await prisma.readingLog.create({
      data: readingLog,
    });

    const result = await sut.execute(userData.id);

    expect(result).toEqual([readingLog]);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const prismaSpy = vi.spyOn(prisma.readingLog, 'findMany');

    await sut.execute(userData.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: userData.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.readingLog, 'findMany').mockRejectedValueOnce(new Error());

    const promise = sut.execute(userOld.id);

    await expect(promise).rejects.toThrow();
  });
});
