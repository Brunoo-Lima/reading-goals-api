import { PostgresRegisterReadingLogRepository } from '../register-reading-log';
import {
  user as fakeUser,
  book as fakeBook,
  readingLog as fakeReadingLog,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';

describe('Register Reading Log Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresRegisterReadingLogRepository();

  test('should register reading log on db', async () => {
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

    const result = await sut.execute(readingLog);

    expect(result).toEqual(readingLog);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const book = await prisma.book.create({
      data: {
        ...fakeBook,
        user_id: userData.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.readingLog, 'create');

    const readingLog = {
      ...fakeReadingLog,
      pages_read: 40,
      user_id: userData.id,
      book_id: book.id,
    };

    await sut.execute(readingLog);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: readingLog,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.readingLog, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeReadingLog);

    await expect(promise).rejects.toThrow();
  });
});
