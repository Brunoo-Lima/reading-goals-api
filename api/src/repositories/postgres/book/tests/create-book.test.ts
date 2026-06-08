import { prisma } from '../../../../lib/prisma';
import { book } from '../../../../tests';
import { PostgresCreateBookRepository } from '../create-book';
import { user as fakeUser } from '../../../../tests';
import { StatusReading } from '../../../../../generated/prisma/enums';

describe('Create Book Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresCreateBookRepository();

  test('should create a book on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = {
      ...book,
      user_id: userData.id,
      status: StatusReading.WISHLIST,
    };

    const result = await sut.execute(bookData);

    expect(result).toEqual(bookData);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const prismaSpy = vi.spyOn(prisma.book, 'create');

    const bookData = {
      ...book,
      user_id: userData.id,
      status: StatusReading.WISHLIST,
    };

    await sut.execute(bookData);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: bookData,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.book, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(book);

    await expect(promise).rejects.toThrow();
  });
});
