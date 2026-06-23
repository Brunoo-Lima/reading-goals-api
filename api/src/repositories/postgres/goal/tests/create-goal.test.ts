import { PostgresCreateGoalRepository } from '../create-goal';
import {
  user as fakeUser,
  goal as fakeGoal,
  book as fakeBook,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';

describe('Create Goal Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const bookOld = {
    ...fakeBook,
    id: undefined as any,
  };

  const sut = new PostgresCreateGoalRepository();

  test('should create a goal on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = await prisma.book.create({
      data: {
        ...bookOld,
        user_id: userData.id,
      },
    });

    const goalData = {
      ...fakeGoal,
      target_value: 20,
      user_id: userData.id,
      book_id: bookData.id,
      progress: undefined,
    };

    const result = await sut.execute(goalData);

    expect(result).toEqual(goalData);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = await prisma.book.create({
      data: {
        ...bookOld,
        user_id: userData.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.goal, 'create');

    const goalData = {
      ...fakeGoal,
      target_value: 20,
      user_id: userData.id,
      book_id: bookData.id,
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
