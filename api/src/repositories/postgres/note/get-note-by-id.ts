import { prisma } from '../../../lib/prisma';

export class PostgresGetNoteByIdRepository {
  async execute(noteId: string) {
    return await prisma.note.findFirst({
      where: {
        id: noteId,
      },
    });
  }
}
