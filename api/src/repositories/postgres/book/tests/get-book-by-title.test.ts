import { PostgresGetBookByTitleRepository } from '../get-book-by-title';
import { prisma } from '../../../../lib/prisma';
import { user as fakeUser, book as fakeBook } from '../../../../tests';

describe('Get Book By Title Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetBookByTitleRepository();

  test('should get a book by title on db', async () => {
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

    const result = await sut.execute(book.title);

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

    await sut.execute(book.title);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        title: book.title,
      },
    });
  });

  test('shoul throw if Prisma throws', async () => {
    vi.spyOn(prisma.book, 'findFirst').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeBook.title);

    await expect(promise).rejects.toThrow();
  });
});
