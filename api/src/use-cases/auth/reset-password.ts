import type { IUpdateUser } from '../../@types/IUser';
import { ExpiredTokenError, InvalidTokenError } from '../../errors';
import { type IPasswordHashAdapter } from '../../interfaces/adapters';
import {
  type IMarkPasswordResetAsUsedRepository,
  type IPasswordResetByTokenRepository,
  type IUpdateUserRepository,
} from '../../interfaces/repositories';

export class ResetPasswordUseCase {
  private passwordResetByTokenRepository: IPasswordResetByTokenRepository;
  private passwordHashAdapter: IPasswordHashAdapter;
  private updateUserRepository: IUpdateUserRepository;
  private markPasswordResetAsUsedRepository: IMarkPasswordResetAsUsedRepository;

  constructor(
    passwordResetByTokenRepository: IPasswordResetByTokenRepository,
    passwordHashAdapter: IPasswordHashAdapter,
    updateUserRepository: IUpdateUserRepository,
    markPasswordResetAsUsedRepository: IMarkPasswordResetAsUsedRepository,
  ) {
    this.passwordResetByTokenRepository = passwordResetByTokenRepository;
    this.passwordHashAdapter = passwordHashAdapter;
    this.updateUserRepository = updateUserRepository;
    this.markPasswordResetAsUsedRepository = markPasswordResetAsUsedRepository;
  }

  async execute(token: string, password: string) {
    const passwordReset =
      await this.passwordResetByTokenRepository.execute(token);

    if (!passwordReset || passwordReset.used_at) {
      throw new InvalidTokenError();
    }

    if (passwordReset.expires_at < new Date()) {
      throw new ExpiredTokenError();
    }

    const hashedPassword = await this.passwordHashAdapter.execute(password);

    await this.markPasswordResetAsUsedRepository.execute(token);

    await this.updateUserRepository.execute(passwordReset.user_id, {
      password: hashedPassword,
    } as IUpdateUser);
  }
}
