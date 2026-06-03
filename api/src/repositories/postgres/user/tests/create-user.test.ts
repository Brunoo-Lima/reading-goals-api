import { prisma } from '../../../../lib/prisma';
import { user } from '../../../../tests';
import { PostgresCreateUserRepository } from '../create-user';

describe('Create User Repository', () => {
  const sut = new PostgresCreateUserRepository();

  test('should create a user on db', async () => {
    const result = await sut.execute(user);

    expect(result.id).toBe(user.id);
    expect(result.name).toBe(user.name);
    expect(result.email).toBe(user.email);
    expect(result.password).toBe(user.password);
  });

  test('should call Prisma with correct params', async () => {
    const prismaSpy = vi.spyOn(prisma.user, 'create');

    await sut.execute(user);

    expect(prismaSpy).toHaveBeenCalledWith({
      data: user,
    });
  });

  test('should throw if Prisma throws', async () => {
    vi.spyOn(prisma.user, 'create').mockRejectedValueOnce(new Error());

    const promise = sut.execute(user);

    await expect(promise).rejects.toThrow();
  });
});
