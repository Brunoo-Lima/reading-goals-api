import { prisma } from '../../../../lib/prisma';
import { PostgresCreateGoalProgressRepository } from '../create-goal-progress';

describe('Create Goal Progress Repository', () => {
  test('should create progress and update the goal in a transaction', async () => {
    const transaction = {
      goalProgress: {
        create: vi.fn().mockResolvedValue({ id: 'progress-id' }),
      },
      goal: {
        update: vi.fn().mockResolvedValue({ id: 'goal-id', current_value: 10 }),
      },
    };

    vi.spyOn(prisma, '$transaction').mockImplementationOnce(
      async (callback: any) => callback(transaction),
    );

    const sut = new PostgresCreateGoalProgressRepository();

    const params = { id: 'progress-id', goal_id: 'goal-id', value: 2 };

    await sut.execute(params);

    expect(transaction.goalProgress.create).toHaveBeenCalledWith({
      data: params,
    });
    expect(transaction.goal.update).toHaveBeenCalledWith({
      where: { id: 'goal-id' },
      data: { current_value: { increment: 2 } },
    });
  });
});
