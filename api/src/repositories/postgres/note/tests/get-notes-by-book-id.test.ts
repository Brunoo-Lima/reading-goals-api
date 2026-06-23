import {
  user as fakeUser,
  book as fakeBook,
  note as fakeNote,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { StatusReading } from '../../../../../generated/prisma/enums';
import { PostgresGetNotesByBookIdRepository } from '../get-notes-by-book-id';

describe('Get Notes By Book Id Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetNotesByBookIdRepository();

  test('should get a notes by user id on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = await prisma.book.create({
      data: {
        ...fakeBook,
        status: StatusReading.WISHLIST,
        user_id: userData.id,
      },
    });

    const noteData = {
      ...fakeNote,
      user_id: userData.id,
      book_id: bookData.id,
    };

    const note = await prisma.note.create({
      data: noteData,
    });

    const result = await sut.execute(userData.id);

    expect(result).toEqual([note]);
  });

  test('should call Prisma with correct params (user_id, book_id)', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = await prisma.book.create({
      data: {
        ...fakeBook,
        status: StatusReading.WISHLIST,
        user_id: userData.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.note, 'findMany');

    await prisma.note.create({
      data: {
        ...fakeNote,
        user_id: userData.id,
        book_id: bookData.id,
      },
    });

    await sut.execute(userData.id, bookData.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: userData.id,
        book_id: bookData.id,
      },
    });
  });

  test('should call Prisma with correct params (user_id)', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = await prisma.book.create({
      data: {
        ...fakeBook,
        status: StatusReading.WISHLIST,
        user_id: userData.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.note, 'findMany');

    await prisma.note.create({
      data: {
        ...fakeNote,
        user_id: userData.id,
        book_id: bookData.id,
      },
    });

    await sut.execute(userData.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: userData.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.note, 'findMany').mockRejectedValueOnce(new Error());

    const promise = sut.execute(userOld.id);

    await expect(promise).rejects.toThrow();
  });
});
