import {
  PasswordComparatorAdapter,
  TokensGeneratorAdapter,
  TokenVerifierAdapter,
} from '../../adapters';
import { LoginController, RefreshTokenController } from '../../controllers';
import { PostgresGetUserByEmailRepository } from '../../repositories/postgres';
import { LoginUseCase, RefreshTokenUseCase } from '../../use-cases';

export const makeLoginController = () => {
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const passwordComparatorAdapter = new PasswordComparatorAdapter();
  const tokensGeneratorAdapter = new TokensGeneratorAdapter();

  const loginUseCase = new LoginUseCase(
    getUserByEmailRepository,
    passwordComparatorAdapter,
    tokensGeneratorAdapter,
  );

  const loginController = new LoginController(loginUseCase);

  return loginController;
};

export const makeRefreshTokenController = () => {
  const tokensGeneratorAdapter = new TokensGeneratorAdapter();
  const tokenVerifierAdapter = new TokenVerifierAdapter();
  const refreshTokenUseCase = new RefreshTokenUseCase(
    tokensGeneratorAdapter,
    tokenVerifierAdapter,
  );

  const refreshTokenController = new RefreshTokenController(
    refreshTokenUseCase,
  );

  return refreshTokenController;
};
