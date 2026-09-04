import { DataInvalidError } from '../../errors';
import type {
  IGenerateTokenAdapter,
  ISecurityKeyComparatorAdapter,
} from '../../interfaces/adapters';
import type {
  IForgotPasswordRepository,
  IGetUserByEmailRepository,
} from '../../interfaces/repositories';

export class ForgotPasswordUseCase {
  private forgotPasswordRepository: IForgotPasswordRepository;
  private getUserByEmailRepository: IGetUserByEmailRepository;
  private generateTokenAdapter: IGenerateTokenAdapter;
  private securityKeyComparatorAdapter: ISecurityKeyComparatorAdapter;

  constructor(
    forgotPasswordRepository: IForgotPasswordRepository,
    getUserByEmailRepository: IGetUserByEmailRepository,
    generateTokenAdapter: IGenerateTokenAdapter,
    securityKeyComparatorAdapter: ISecurityKeyComparatorAdapter,
  ) {
    this.forgotPasswordRepository = forgotPasswordRepository;
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.generateTokenAdapter = generateTokenAdapter;
    this.securityKeyComparatorAdapter = securityKeyComparatorAdapter;
  }

  async execute(email: string, securityKey: string) {
    const user = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new DataInvalidError('Data invalid');
    }

    const isSecurityKeyValid = await this.securityKeyComparatorAdapter.execute(
      securityKey,
      user.securityKey as string,
    );

    if (!isSecurityKeyValid) {
      throw new DataInvalidError('Data invalid');
    }

    await this.forgotPasswordRepository.invalidatePrevious(user.id);

    const token = this.generateTokenAdapter.execute();
    const expiresAt = new Date(Date.now() + 1000 * 60 * 5);

    await this.forgotPasswordRepository.execute({
      user_id: user.id,
      token,
      expires_at: expiresAt,
    });

    return token;
  }
}
