import { prisma } from '../../../../lib/prisma';
import { PostgresGetUserByIdRepository } from '../get-user-by-id';
import { user as fakeUser } from '../../../../tests';

describe('Get User By Id Repository', () => {
  const userFound = {
    ...fakeUser,
    books: [],
    goals: [],
    notes: [],
    readingLogs: [],
  };

  const sut = new PostgresGetUserByIdRepository();

  test('should get a user by id on db', async () => {
    const user = await prisma.user.create({
      data: fakeUser,
    });

    const result = await sut.execute(user.id);

    expect(result).toStrictEqual(userFound);
  });

  test('should call Prisma with correct params', async () => {
    const prismaSpy = vi.spyOn(prisma.user, 'findUnique');

    await sut.execute(fakeUser.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: fakeUser.id,
      },
      include: {
        books: true,
        goals: true,
        notes: true,
        readingLogs: true,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeUser.id);

    await expect(promise).rejects.toThrow();
  });
});
