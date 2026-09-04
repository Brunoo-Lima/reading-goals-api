import { user } from '../../../tests';
import { ResetPasswordUseCase } from '../reset-password';

describe('Reset Password Use Case', () => {
  class PasswordResetByTokenRepositoryStub {
    async execute() {
      return {
        token: 'any_token',
        expires_at: new Date(Date.now() + 1000 * 60 * 5),
        used_at: null,
        user_id: 'any_user_id',
      };
    }
  }

  class PasswordHashAdapterStub {
    async execute() {
      return 'hashed_password';
    }
  }

  class UpdateUserRepositoryStub {
    async execute() {
      return user;
    }
  }

  class MarkPasswordResetAsUsedRepositoryStub {
    async execute() {}
  }

  const makeSut = () => {
    const passwordResetByTokenRepository =
      new PasswordResetByTokenRepositoryStub();
    const passwordHashAdapter = new PasswordHashAdapterStub();
    const updateUserRepository = new UpdateUserRepositoryStub();
    const markPasswordResetAsUsedRepository =
      new MarkPasswordResetAsUsedRepositoryStub();

    const sut = new ResetPasswordUseCase(
      passwordResetByTokenRepository,
      passwordHashAdapter,
      updateUserRepository,
      markPasswordResetAsUsedRepository,
    );

    return {
      sut,
      passwordResetByTokenRepository,
      passwordHashAdapter,
      updateUserRepository,
      markPasswordResetAsUsedRepository,
    };
  };

  test('should reset password successfully', async () => {
    const { sut } = makeSut();
    const token = 'any_token';
    const password = 'any_password';

    await expect(sut.execute(token, password)).resolves.not.toThrow();
  });

  test('should throw if token is invalid', async () => {
    const { sut, passwordResetByTokenRepository } = makeSut();
    vi.spyOn(passwordResetByTokenRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const promise = sut.execute('invalid_token', 'any_password');

    await expect(promise).rejects.toThrow();
  });

  test('should throw if token is expired', async () => {
    const { sut, passwordResetByTokenRepository } = makeSut();
    vi.spyOn(passwordResetByTokenRepository, 'execute').mockResolvedValueOnce({
      token: 'any_token',
      expires_at: new Date(Date.now() - 1000 * 60 * 5),
    } as any);

    const promise = sut.execute('any_token', 'any_password');

    await expect(promise).rejects.toThrow();
  });

  test('should throw if PasswordHashAdapter throws', async () => {
    const { sut, passwordHashAdapter } = makeSut();
    vi.spyOn(passwordHashAdapter, 'execute').mockRejectedValueOnce(new Error());

    const promise = sut.execute('any_token', 'any_password');

    await expect(promise).rejects.toThrow();
  });

  test('should throw if PasswordResetByTokenRepository throws', async () => {
    const { sut, passwordResetByTokenRepository } = makeSut();
    vi.spyOn(passwordResetByTokenRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute('any_token', 'any_password');

    await expect(promise).rejects.toThrow();
  });
});
