import {
  PasswordComparatorAdapter,
  PasswordHashAdapter,
  TokensGeneratorAdapter,
  TokenVerifierAdapter,
  SecurityKeyComparatorAdapter,
  GenerateTokenAdapter,
} from '../../adapters';
import {
  LoginController,
  RefreshTokenController,
  ResetPasswordController,
  ForgotPasswordController,
} from '../../controllers';
import {
  PostgresForgotPasswordRepository,
  PostgresGetUserByEmailRepository,
  PostgresMarkPasswordResetAsUsedRepository,
  PostgresResetPasswordByTokenRepository,
  PostgresUpdateUserRepository,
} from '../../repositories/postgres';

import {
  ForgotPasswordUseCase,
  LoginUseCase,
  RefreshTokenUseCase,
  ResetPasswordUseCase,
} from '../../use-cases';

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

export const makeForgotPasswordController = () => {
  const forgotPasswordRepository = new PostgresForgotPasswordRepository();
  const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
  const generateTokenAdapter = new GenerateTokenAdapter();
  const securityKeyComparatorAdapter = new SecurityKeyComparatorAdapter();

  const forgotPasswordUseCase = new ForgotPasswordUseCase(
    forgotPasswordRepository,
    getUserByEmailRepository,
    generateTokenAdapter,
    securityKeyComparatorAdapter,
  );

  const forgotPasswordController = new ForgotPasswordController(
    forgotPasswordUseCase,
  );

  return forgotPasswordController;
};

export const makeResetPasswordController = () => {
  const passwordResetByTokenRepository =
    new PostgresResetPasswordByTokenRepository();
  const passwordHashAdapter = new PasswordHashAdapter();
  const updateUserRepository = new PostgresUpdateUserRepository();
  const markPasswordResetAsUsedRepository =
    new PostgresMarkPasswordResetAsUsedRepository();

  const resetPasswordUseCase = new ResetPasswordUseCase(
    passwordResetByTokenRepository,
    passwordHashAdapter,
    updateUserRepository,
    markPasswordResetAsUsedRepository,
  );

  const resetPasswordController = new ResetPasswordController(
    resetPasswordUseCase,
  );

  return resetPasswordController;
};
