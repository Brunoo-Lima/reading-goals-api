import { prisma } from '../../../lib/prisma';
import type { ChatMessageRole } from '../../../interfaces/repositories';

export class PostgresChatRepository {
  async clear(userId: string) {
    return prisma.chatMessage.deleteMany({ where: { user_id: userId } });
  }
  async list(userId: string) {
    return prisma.chatMessage.findMany({
      where: { user_id: userId },
      orderBy: { created_at: 'asc' },
      take: 100,
    });
  }

  async create(
    userId: string,
    role: ChatMessageRole,
    content: string,
    responseId?: string,
  ) {
    return prisma.chatMessage.create({
      data: {
        user_id: userId,
        role,
        content,
        ...(responseId ? { response_id: responseId } : {}),
      },
    });
  }
}
