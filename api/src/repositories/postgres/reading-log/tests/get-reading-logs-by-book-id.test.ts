import {
  user as fakeUser,
  book as fakeBook,
  readingLog as fakeReadingLog,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresGetReadingLogsByBookIdRepository } from '../get-reading-logs-by-book-id';

describe('Get Reading Logs By Book Id Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetReadingLogsByBookIdRepository();

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

    const result = await sut.execute(book.id, userData.id);

    expect(result).toEqual([readingLog]);
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

    const prismaSpy = vi.spyOn(prisma.readingLog, 'findMany');

    await sut.execute(book.id, userData.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: userData.id,
        book_id: book.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.readingLog, 'findMany').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeBook.id, fakeUser.id);

    await expect(promise).rejects.toThrow();
  });
});
