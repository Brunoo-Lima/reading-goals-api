import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { StatusReading } from '../../../../../generated/prisma/enums';
import { prisma } from '../../../../lib/prisma';
import { book as fakeBook, user as fakeUser } from '../../../../tests';
import { PostgresUpdateBookRepository } from '../update-book';

describe('Update Book Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresUpdateBookRepository();

  test('should update a book on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const book = await prisma.book.create({
      data: {
        ...fakeBook,
        user_id: userData.id,
      },
    });

    const bookData = {
      ...book,
      user_id: userData.id,
      status: StatusReading.COMPLETED,
    };

    const result = await sut.execute(book.id, bookData);

    expect(result).toEqual(bookData);
  });

  test('should call Prisma with correct params', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const book = await prisma.book.create({
      data: {
        ...fakeBook,
        user_id: user.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.book, 'update');

    const bookData = {
      ...book,
      user_id: user.id,
      status: StatusReading.COMPLETED,
    };

    await sut.execute(book.id, bookData);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: book.id,
      },
      data: bookData,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.book, 'update').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeBook.id, fakeBook);

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

    vi.spyOn(prisma.book, 'update').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(book.id, fakeBook);

    await expect(promise).rejects.toThrow();
  });
});
