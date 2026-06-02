import type { INote } from '../../../@types/INote';
import { prisma } from '../../../lib/prisma';

export class PostgresCreateNoteRepository {
  async execute(noteParams: INote) {
    return await prisma.note.create({
      data: noteParams,
    });
  }
}
