import { prisma } from '../../../../lib/prisma';
import { PostgresResetPasswordByTokenRepository } from '../reset-password-by-token';

describe('Reset Password By Token Repository', () => {
  test('should find a password reset by token', async () => {
    const sut = new PostgresResetPasswordByTokenRepository();

    const spy = vi
      .spyOn(prisma.passwordReset, 'findUnique')
      .mockResolvedValueOnce(null);

    await sut.execute('token');

    expect(spy).toHaveBeenCalledWith({ where: { token: 'token' } });
  });

  test('should throw if Prisma throws', async () => {
    const sut = new PostgresResetPasswordByTokenRepository();

    vi.spyOn(prisma.passwordReset, 'findUnique').mockRejectedValueOnce(
      new Error(),
    );

    await expect(sut.execute('token')).rejects.toThrow();
  });
});
