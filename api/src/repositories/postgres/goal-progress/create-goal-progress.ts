import type { ICreateGoalProgress } from '../../../@types/IGoalProgress';
import { prisma } from '../../../lib/prisma';

export class PostgresCreateGoalProgressRepository {
  async execute(goalProgressParams: ICreateGoalProgress) {
    return await prisma.$transaction(async (transaction) => {
      const progress = await transaction.goalProgress.create({
        data: goalProgressParams,
      });

      const goal = await transaction.goal.update({
        where: {
          id: goalProgressParams.goal_id,
        },
        data: {
          current_value: {
            increment: goalProgressParams.value,
          },
        },
      });

      return {
        goal,
        progress,
      };
    });
  }
}
