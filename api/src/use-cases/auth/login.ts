import { InvalidPasswordError, UserNotFoundError } from '../../errors';
import type { IPasswordComparatorAdapter } from '../../interfaces/adapters';
import type { ITokensGeneratorAdapter } from '../../interfaces/adapters/tokens-generator';
import type { IGetUserByEmailRepository } from '../../interfaces/repositories';

export class LoginUseCase {
  private getUserByEmailRepository: IGetUserByEmailRepository;
  private passwordComparatorAdapter: IPasswordComparatorAdapter;
  private tokensGeneratorAdapter: ITokensGeneratorAdapter;

  constructor(
    getUserByEmailRepository: IGetUserByEmailRepository,
    passwordComparatorAdapter: IPasswordComparatorAdapter,
    tokensGeneratorAdapter: ITokensGeneratorAdapter,
  ) {
    this.getUserByEmailRepository = getUserByEmailRepository;
    this.passwordComparatorAdapter = passwordComparatorAdapter;
    this.tokensGeneratorAdapter = tokensGeneratorAdapter;
  }

  async execute(email: string, password: string) {
    const user = await this.getUserByEmailRepository.execute(email);

    if (!user) {
      throw new UserNotFoundError();
    }

    const isPasswordValid = await this.passwordComparatorAdapter.execute(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new InvalidPasswordError();
    }

    const tokens = this.tokensGeneratorAdapter.execute(user.id);

    return {
      ...user,
      tokens,
    };
  }
}
