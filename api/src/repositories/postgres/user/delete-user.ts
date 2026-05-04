import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UserNotFoundError } from '../../../errors';
import { prisma } from '../../../lib/prisma';

export class PostgresDeleteUserRepository {
  async execute(userId: string) {
    try {
      return await prisma.user.delete({
        where: {
          id: userId,
        },
        include: {
          books: true,
          goals: true,
          notes: true,
          readingLogs: true,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2025 = An operation failed because it depends on one or more records that were required but not found. {cause}
        if (error.code === 'P2025') {
          throw new UserNotFoundError(userId);
        }
      }

      throw error;
    }
  }
}
