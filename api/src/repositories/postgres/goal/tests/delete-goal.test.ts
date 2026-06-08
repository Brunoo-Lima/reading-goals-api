import { user as fakeUser, goal as fakeGoal } from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresDeleteGoalRepository } from '../delete-goal';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';

describe('Delete Goal Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresDeleteGoalRepository();

  test('should delete a goal on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const goal = await prisma.goal.create({
      data: {
        ...fakeGoal,
        target_value: 20,
        user_id: userData.id,
      },
    });

    const result = await sut.execute(goal.id);

    expect(result).toEqual(goal);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const goal = await prisma.goal.create({
      data: {
        ...fakeGoal,
        target_value: 20,
        user_id: userData.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.goal, 'delete');

    await sut.execute(goal.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: goal.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.goal, 'delete').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeGoal.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw GoalNotFoundError if goal is not found', async () => {
    vi.spyOn(prisma.goal, 'delete').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(fakeGoal.id);

    await expect(promise).rejects.toThrow();
  });
});
