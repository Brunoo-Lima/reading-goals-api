import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '../../../lib/prisma';
import { NoteNotFoundError } from '../../../errors';

export class PostgresDeleteNoteRepository {
  async execute(noteId: string) {
    try {
      return await prisma.note.delete({
        where: {
          id: noteId,
        },
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
