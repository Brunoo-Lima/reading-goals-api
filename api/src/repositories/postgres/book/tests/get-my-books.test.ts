import { PostgresGetMyBooksRepository } from '../get-my-books';
import { prisma } from '../../../../lib/prisma';
import { user as fakeUser, book as fakeBook } from '../../../../tests';
import { StatusReading } from '../../../../../generated/prisma/enums';

describe('Get My Books Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetMyBooksRepository();

  test('should get my books on db', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...fakeBook,
      user_id: user.id,
    };

    await prisma.book.create({
      data: bookData,
    });

    const result = await sut.execute(user.id);

    expect(result).toEqual([bookData]);
  });

  test('should get my books on search on db', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...fakeBook,
      user_id: user.id,
    };

    await prisma.book.create({
      data: bookData,
    });

    const result = await sut.execute(user.id, bookData.title);

    expect(result).toEqual([bookData]);
  });

  test('should get my books on genre on db', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...fakeBook,
      user_id: user.id,
    };

    await prisma.book.create({
      data: bookData,
    });

    const result = await sut.execute(user.id, undefined, 'Mystery');

    expect(result).toEqual([bookData]);
  });

  test('should get my books on status on db', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...fakeBook,
      user_id: user.id,
    };

    await prisma.book.create({
      data: bookData,
    });

    const result = await sut.execute(
      user.id,
      undefined,
      undefined,
      StatusReading.WISHLIST,
    );

    expect(result).toEqual([bookData]);
  });

  test('should call Prisma with correct params', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    const prismaSpy = vi.spyOn(prisma.book, 'findMany');

    await sut.execute(user.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    const user = await prisma.user.create({
      data: userOld,
    });

    vi.spyOn(prisma.book, 'findMany').mockRejectedValueOnce(new Error());

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow();
  });
});
