import { prisma } from '../../../../lib/prisma';
import { PostgresForgotPasswordRepository } from '../forgot-password';

describe('Forgot Password Repository', () => {
  test('should create a password reset', async () => {
    const sut = new PostgresForgotPasswordRepository();

    const params = {
      id: 'id',
      token: 'token',
      user_id: 'user-id',
      expires_at: new Date(),
    } as any;

    const spy = vi
      .spyOn(prisma.passwordReset, 'create')
      .mockResolvedValueOnce({} as any);

    await sut.execute(params);

    expect(spy).toHaveBeenCalledWith({ data: params });
  });

  test('should invalidate previous password resets', async () => {
    const sut = new PostgresForgotPasswordRepository();

    const spy = vi
      .spyOn(prisma.passwordReset, 'updateMany')
      .mockResolvedValueOnce({ count: 1 });

    await sut.invalidatePrevious('user-id');

    expect(spy).toHaveBeenCalledWith({
      where: { user_id: 'user-id', used_at: null },
      data: { used_at: expect.any(Date) },
    });
  });
});
