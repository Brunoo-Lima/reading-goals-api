import {
  user as fakeUser,
  book as fakeBook,
  note as fakeNote,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { StatusReading } from '../../../../../generated/prisma/enums';
import { PostgresDeleteNoteRepository } from '../delete-note';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

describe('Delete Note Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresDeleteNoteRepository();

  test('should delete a note on db', async () => {
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

    const prismaSpy = vi.spyOn(prisma.note, 'delete');

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
    vi.spyOn(prisma.note, 'delete').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeNote.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw NoteNotFoundError if note is not found', async () => {
    vi.spyOn(prisma.note, 'delete').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(fakeNote.id);

    await expect(promise).rejects.toThrow();
  });
});
