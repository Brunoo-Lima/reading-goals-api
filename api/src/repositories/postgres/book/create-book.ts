import type { IBook } from '../../../@types/IBook';
import { prisma } from '../../../lib/prisma';

export class PostgresCreateBookRepository {
  async execute(book: IBook) {
    return await prisma.book.create({
      data: book,
    });
  }
}
