import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import type { IUpdateNote } from '../../../@types/INote';
import { prisma } from '../../../lib/prisma';
import { NoteNotFoundError } from '../../../errors';

export class PostgresUpdateNoteRepository {
  async execute(noteId: string, updateNoteParams: IUpdateNote) {
    try {
      return await prisma.note.update({
        where: {
          id: noteId,
        },
        data: updateNoteParams,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2025 = An operation failed because it depends on one or more records that were required but not found. {cause}
        if (error.code === 'P2025') {
          throw new NoteNotFoundError(noteId);
        }
      }

      throw error;
    }
  }
}
