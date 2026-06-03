import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { prisma } from '../../../../lib/prisma';
import { user as fakeUser } from '../../../../tests';
import { PostgresDeleteUserRepository } from '../delete-user';
import { UserNotFoundError } from '../../../../errors';

describe('Delete User Repository', () => {
  const user = {
    ...fakeUser,
    books: [],
    goals: [],
    notes: [],
    readingLogs: [],
  };

  const sut = new PostgresDeleteUserRepository();

  test('should delete a user on db', async () => {
    await prisma.user.create({
      data: fakeUser,
    });

    const result = await sut.execute(user.id);

    expect(result).toEqual(user);
  });

  test('should call Prisma with correct params', async () => {
    await prisma.user.create({
      data: fakeUser,
    });

    const prismaSpy = vi.spyOn(prisma.user, 'delete');

    await sut.execute(user.id);

    expect(prismaSpy).toHaveBeenCalledWith({
      where: {
        id: user.id,
      },
      include: {
        books: true,
        goals: true,
        notes: true,
        readingLogs: true,
      },
    });
  });

  test('should throw generic error if Prisma throws generic error', async () => {
    vi.spyOn(prisma.user, 'delete').mockRejectedValueOnce(new Error());

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow();
  });

  test('should throw UserNotFoundError if user does not exist', async () => {
    vi.spyOn(prisma.user, 'delete').mockRejectedValueOnce(
      new PrismaClientKnownRequestError('', {
        code: 'P2025',
        clientVersion: '5.0.0',
      }),
    );

    const promise = sut.execute(user.id);

    await expect(promise).rejects.toThrow(new UserNotFoundError(user.id));
  });
});
