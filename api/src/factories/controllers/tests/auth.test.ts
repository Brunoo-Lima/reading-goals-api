import {
  ForgotPasswordController,
  LoginController,
  RefreshTokenController,
  ResetPasswordController,
} from '../../../controllers';

import {
  makeForgotPasswordController,
  makeLoginController,
  makeRefreshTokenController,
  makeResetPasswordController,
} from '../auth';

describe('Factory Auth Controller', () => {
  test('should return a LoginController', () => {
    const loginController = makeLoginController();
    expect(loginController).toBeInstanceOf(LoginController);
  });

  test('should return a RefreshTokenController', () => {
    const refreshTokenController = makeRefreshTokenController();
    expect(refreshTokenController).toBeInstanceOf(RefreshTokenController);
  });

  test('should return a ForgotPasswordController', () => {
    const forgotPasswordController = makeForgotPasswordController();
    expect(forgotPasswordController).toBeInstanceOf(ForgotPasswordController);
  });

  test('should return a ResetPasswordController', () => {
    const resetPasswordController = makeResetPasswordController();
    expect(resetPasswordController).toBeInstanceOf(ResetPasswordController);
  });
});
