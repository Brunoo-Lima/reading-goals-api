import { prisma } from '../../../../lib/prisma';
import { PostgresMarkPasswordResetAsUsedRepository } from '../mark-password-reset-as-used';

describe('Mark Password Reset As Used Repository', () => {
  test('should mark a password reset as used', async () => {
    const sut = new PostgresMarkPasswordResetAsUsedRepository();

    const spy = vi
      .spyOn(prisma.passwordReset, 'update')
      .mockResolvedValueOnce({} as any);

    await sut.execute('token');

    expect(spy).toHaveBeenCalledWith({
      where: { token: 'token' },
      data: { used_at: expect.any(Date) },
    });
  });

  test('should throw if Prisma throws', async () => {
    const sut = new PostgresMarkPasswordResetAsUsedRepository();

    vi.spyOn(prisma.passwordReset, 'update').mockRejectedValueOnce(new Error());

    await expect(sut.execute('token')).rejects.toThrow();
  });
});
