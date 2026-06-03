import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '../../../../lib/prisma';
import { book as fakeBook, user as fakeUser } from '../../../../tests';
import { PostgresDeleteBookRepository } from '../delete-book';

describe('Delete Book Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresDeleteBookRepository();

  test('should delete a book on db', async () => {
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

    expect(result).toEqual(book);
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

    const prismaSpy = vi.spyOn(prisma.book, 'delete');

    await sut.execute(book.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: book.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
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

    vi.spyOn(prisma.book, 'delete').mockRejectedValueOnce(new Error());

    const promise = sut.execute(book.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw BookNotFoundError if book is not found', async () => {
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

    vi.spyOn(prisma.book, 'delete').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(book.id);

    await expect(promise).rejects.toThrow();
  });
});
