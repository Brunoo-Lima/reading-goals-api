import {
  user as fakeUser,
  book as fakeBook,
  note as fakeNote,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { StatusReading } from '../../../../../generated/prisma/enums';
import { PostgresGetNoteByIdRepository } from '../get-note-by-id';

describe('Get Note By Id Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetNoteByIdRepository();

  test('should get a note by id on db', async () => {
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

    const result = await sut.execute(note.id);

    expect(result).toEqual(note);
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

    const prismaSpy = vi.spyOn(prisma.note, 'findFirst');

    const noteData = {
      ...fakeNote,
      user_id: userData.id,
      book_id: bookData.id,
    };

    const note = await prisma.note.create({
      data: noteData,
    });

    await sut.execute(note.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: noteData.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.note, 'findFirst').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeNote.id);

    await expect(promise).rejects.toThrow();
  });
});
