import type { IForgotPassword } from '../../../@types/IAuth';
import { prisma } from '../../../lib/prisma';

export class PostgresForgotPasswordRepository {
  async execute(forgotPasswordParams: IForgotPassword): Promise<void> {
    await prisma.passwordReset.create({
      data: forgotPasswordParams,
    });
  }

  async invalidatePrevious(user_id: string): Promise<void> {
    await prisma.passwordReset.updateMany({
      where: {
        user_id,
        used_at: null,
      },
      data: {
        used_at: new Date(),
      },
    });
  }
}
