import {
  user as fakeUser,
  book as fakeBook,
  note as fakeNote,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresCreateNoteRepository } from '../create-note';
import { StatusReading } from '../../../../../generated/prisma/enums';

describe('Create Note Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresCreateNoteRepository();

  test('should create a note on db', async () => {
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

    const result = await sut.execute(noteData);

    expect(result).toEqual(noteData);
  });

  test('should call Prisma with correct params', async () => {
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

    const prismaSpy = vi.spyOn(prisma.note, 'create');

    const noteData = {
      ...fakeNote,
      user_id: userData.id,
      book_id: bookData.id,
    };

    await sut.execute(noteData);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: noteData,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.note, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeNote);

    await expect(promise).rejects.toThrow();
  });
});
