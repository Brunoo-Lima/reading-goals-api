import {
  user as fakeUser,
  book as fakeBook,
  note as fakeNote,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { StatusReading } from '../../../../../generated/prisma/enums';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { PostgresUpdateNoteRepository } from '../update-note';

describe('Update Note Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresUpdateNoteRepository();

  test('should update a note on db', async () => {
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

    const result = await sut.execute(note.id, noteData);

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

    const prismaSpy = vi.spyOn(prisma.note, 'update');

    const noteData = {
      ...fakeNote,
      user_id: userData.id,
      book_id: bookData.id,
    };

    const note = await prisma.note.create({
      data: noteData,
    });

    await sut.execute(note.id, noteData);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: noteData.id,
      },
      data: noteData,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.note, 'update').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeNote.id, fakeNote);

    await expect(promise).rejects.toThrow();
  });

  test('should throw NoteNotFoundError if note is not found', async () => {
    vi.spyOn(prisma.note, 'update').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(fakeNote.id, fakeNote);

    await expect(promise).rejects.toThrow();
  });
});
