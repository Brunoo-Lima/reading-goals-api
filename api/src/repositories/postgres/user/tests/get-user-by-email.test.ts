import { prisma } from '../../../../lib/prisma';
import { PostgresGetUserByEmailRepository } from '../get-user-by-email';
import { user as fakeUser } from '../../../../tests';

describe('Get User By Email Repository', () => {
  const sut = new PostgresGetUserByEmailRepository();

  test('should get a user by email on db', async () => {
    const user = await prisma.user.create({
      data: fakeUser,
    });

    const result = await sut.execute(user.email);

    expect(result).toStrictEqual(user);
  });

  test('should call Prisma with correct params', async () => {
    const prismaSpy = vi.spyOn(prisma.user, 'findUnique');

    await sut.execute(fakeUser.email);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        email: fakeUser.email,
      },
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.user, 'findUnique').mockRejectedValueOnce(new Error());

    const promise = sut.execute(fakeUser.email);

    await expect(promise).rejects.toThrow();
  });
});
