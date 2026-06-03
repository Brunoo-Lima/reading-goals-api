import { prisma } from '../../../../lib/prisma';
import { PostgresUpdateUserRepository } from '../update-user';
import { user as fakeUser } from '../../../../tests';
import { faker } from '@faker-js/faker';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { UserNotFoundError } from '../../../../errors';

describe('Update User Repository', () => {
  const updateUserParams = {
    id: faker.string.uuid(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.anytime(),
    updated_at: faker.date.anytime(),
  };

  const sut = new PostgresUpdateUserRepository();

  test('should update a user on db', async () => {
    const user = await prisma.user.create({
      data: fakeUser,
    });

    const result = await sut.execute(user.id, updateUserParams);

    expect(result).toStrictEqual(updateUserParams);
  });

  test('should call Prisma with correct params', async () => {
    const user = await prisma.user.create({
      data: fakeUser,
    });

    const prismaSpy = vi.spyOn(prisma.user, 'update');

    await sut.execute(user.id, updateUserParams);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: user.id,
      },
      data: updateUserParams,
    });
  });

  test('should throw if Prisma throws', async () => {
    const user = await prisma.user.create({
      data: fakeUser,
    });

    vi.spyOn(prisma.user, 'update').mockRejectedValueOnce(new Error());

    const promise = sut.execute(user.id, updateUserParams);

    await expect(promise).rejects.toThrow();
  });

  test('should throw UserNotFoundError if user is not found', async () => {
    vi.spyOn(prisma.user, 'update').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', { code: 'P2025' } as any),
    );

    const promise = sut.execute(fakeUser.id, updateUserParams);

    await expect(promise).rejects.toThrow(new UserNotFoundError(fakeUser.id));
  });
});
