import { PostgresGetBookByIdRepository } from '../get-book-by-id';
import { prisma } from '../../../../lib/prisma';
import { user as fakeUser, book as fakeBook } from '../../../../tests';

describe('Get Book By ID Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetBookByIdRepository();

  test('should get a book by id on db', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...fakeBook,
      user_id: user.id,
    };

    const book = await prisma.book.create({
      data: bookData,
    });

    const result = await sut.execute(book.id);

    expect(result).toEqual(bookData);
  });

  test('should call Prisma with correct params', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...fakeBook,
      user_id: user.id,
    };

    const book = await prisma.book.create({
      data: bookData,
    });

    const prismaSpy = vi.spyOn(prisma.book, 'findFirst');

    await sut.execute(book.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: book.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.book, 'findFirst').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeBook.id);

    await expect(promise).rejects.toThrow();
  });
});
