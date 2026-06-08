import { PostgresCreateGoalRepository } from '../create-goal';
import { user as fakeUser, goal as fakeGoal } from '../../../../tests';
import { prisma } from '../../../../lib/prisma';

describe('Create Goal Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const sut = new PostgresCreateGoalRepository();

  test('should create a goal on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const goalData = {
      ...fakeGoal,
      target_value: 20,
      user_id: userData.id,
    };

    const result = await sut.execute(goalData);

    expect(result).toEqual(goalData);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const prismaSpy = vi.spyOn(prisma.goal, 'create');

    const goalData = {
      ...fakeGoal,
      target_value: 20,
      user_id: userData.id,
    };

    await sut.execute(goalData);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: goalData,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.goal, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeGoal);

    await expect(promise).rejects.toThrow();
  });
});
