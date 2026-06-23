import type { ICreateGoal } from '../../../@types/IGoal';
import { prisma } from '../../../lib/prisma';

export class PostgresCreateGoalRepository {
  async execute(goal: ICreateGoal) {
    return await prisma.goal.create({
      data: goal,
    });
  }
}
