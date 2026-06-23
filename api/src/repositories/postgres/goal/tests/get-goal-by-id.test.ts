import {
  user as fakeUser,
  goal as fakeGoal,
  book as fakeBook,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresGetGoalByIdRepository } from '../get-goal-by-id';

describe('Get Goal By Id Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const bookOld = {
    ...fakeBook,
    id: undefined as any,
  };

  const sut = new PostgresGetGoalByIdRepository();

  test('should get a goal by id on db', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const bookData = await prisma.book.create({
      data: {
        ...bookOld,
        user_id: userData.id,
      },
    });

    const goal = await prisma.goal.create({
      data: {
        ...fakeGoal,
        target_value: 20,
        current_value: 10,
        user_id: userData.id,
        book_id: bookData.id,
      },
    });

    const result = await sut.execute(goal.id);

    expect(result).toEqual({
      ...goal,
      progress: [],
    });
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

    const goal = await prisma.goal.create({
      data: {
        ...fakeGoal,
        target_value: 20,
        user_id: userData.id,
        book_id: bookData.id,
      },
    });

    const prismaSpy = vi.spyOn(prisma.goal, 'findFirst');

    await sut.execute(goal.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: goal.id,
      },
      include: {
        progress: true,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.goal, 'findFirst').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeGoal.id);

    await expect(promise).rejects.toThrow();
  });
});
