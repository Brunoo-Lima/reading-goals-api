import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { GoalNotFoundError } from '../../../errors';
import type { IUpdateGoal } from '../../../@types/IGoal';
import { prisma } from '../../../lib/prisma';

export class PostgresUpdateGoalRepository {
  async execute(goalId: string, updateGoalParams: IUpdateGoal) {
    try {
      return await prisma.goal.update({
        where: {
          id: goalId,
        },
        data: updateGoalParams,
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        // P2025 = An operation failed because it depends on one or more records that were required but not found. {cause}
        if (error.code === 'P2025') {
          throw new GoalNotFoundError(goalId);
        }
      }

      throw error;
    }
  }
}
