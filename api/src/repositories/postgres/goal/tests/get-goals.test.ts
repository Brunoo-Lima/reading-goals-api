import {
  user as fakeUser,
  goal as fakeGoal,
  book as fakeBook,
} from '../../../../tests';
import { prisma } from '../../../../lib/prisma';
import { PostgresGetGoalsRepository } from '../get-goals';

describe('Get Goals Repository', () => {
  const userOld = {
    ...fakeUser,
    id: undefined as any,
  };

  const bookOld = {
    ...fakeBook,
    id: undefined as any,
  };

  const sut = new PostgresGetGoalsRepository();

  test('should get a goals on db', async () => {
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

    const result = await sut.execute(userData.id);

    expect(result).toEqual([
      {
        ...goal,
        target_value: 20,
        user_id: userData.id,
        book_id: bookData.id,
        progress: [],
      },
    ]);
    expect(result.length).toBe(1);
  });

  test('should call Prisma with correct params', async () => {
    const userData = await prisma.user.create({
      data: userOld,
    });

    const prismaSpy = vi.spyOn(prisma.goal, 'findMany');

    await sut.execute(userData.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        user_id: userData.id,
      },
      include: {
        progress: true,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.goal, 'findMany').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeGoal.id);

    await expect(promise).rejects.toThrow();
  });
});
