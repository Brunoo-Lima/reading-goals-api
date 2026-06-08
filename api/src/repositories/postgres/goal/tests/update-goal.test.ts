import { user as fakeUser, goal as fakeGoal } from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresUpdateGoalRepository } from '../update-goal';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

describe('Update Goal Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresUpdateGoalRepository();

  test('should update a goal on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const goalData = {
      ...fakeGoal,
      target_value: 20,
      user_id: userData.id,
    };

    const goal = await prisma.goal.create({
      data: goalData,
    });

    const result = await sut.execute(goal.id, goalData);

    expect(result).toEqual(goalData);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const prismaSpy = vi.spyOn(prisma.goal, 'update');

    const goalData = {
      ...fakeGoal,
      target_value: 20,
      user_id: userData.id,
    };

    const goal = await prisma.goal.create({
      data: goalData,
    });

    await sut.execute(goal.id, goalData);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: goal.id,
      },
      data: goalData,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.goal, 'update').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeGoal.id, fakeGoal);

    await expect(promise).rejects.toThrow();
  });

  test('should throw GoalNotFoundError if goal is not found', async () => {
    vi.spyOn(prisma.goal, 'update').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(fakeGoal.id, fakeGoal);

    await expect(promise).rejects.toThrow();
  });
});
