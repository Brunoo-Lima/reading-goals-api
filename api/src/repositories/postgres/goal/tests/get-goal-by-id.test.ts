import { user as fakeUser, goal as fakeGoal } from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresGetGoalByIdRepository } from '../get-goal-by-id';

describe('Get Goal By Id Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresGetGoalByIdRepository();

  test('should get a goal by id on db', async () => {
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

    const prismaSpy = vi.spyOn(prisma.goal, 'findFirst');

    await sut.execute(goal.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: goal.id,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.goal, 'findFirst').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeGoal.id);

    await expect(promise).rejects.toThrow();
  });
});
