import { user } from '../../../tests';
import { ForgotPasswordUseCase } from '../forgot-password';

describe('Forgot Password Use Case', () => {
  class ForgotPasswordRepositoryStub {
    async execute() {}

    async invalidatePrevious() {}
  }

  class GetUserByEmailRepositoryStub {
    async execute() {
      return user;
    }
  }

  class GenerateTokenAdapterStub {
    execute() {
      return 'any_token';
    }
  }

  class SecurityKeyComparatorAdapterStub {
    async execute() {
      return true;
    }
  }

  const makeSut = () => {
    const forgotPasswordRepository = new ForgotPasswordRepositoryStub();
    const getUserByEmailRepository = new GetUserByEmailRepositoryStub();
    const generateTokenAdapter = new GenerateTokenAdapterStub();
    const securityKeyComparatorAdapter = new SecurityKeyComparatorAdapterStub();

    const sut = new ForgotPasswordUseCase(
      forgotPasswordRepository,
      getUserByEmailRepository,
      generateTokenAdapter,
      securityKeyComparatorAdapter,
    );

    return {
      sut,
      forgotPasswordRepository,
      getUserByEmailRepository,
      generateTokenAdapter,
      securityKeyComparatorAdapter,
    };
  };

  test('should return a token on success', async () => {
    const { sut } = makeSut();
    const email = 'any_email';
    const securityKey = 'any_security_key';

    const result = await sut.execute(email, securityKey);

    expect(result).toBe('any_token');
  });

  test('should throw if user is not found', async () => {
    const { sut, getUserByEmailRepository } = makeSut();
    vi.spyOn(getUserByEmailRepository, 'execute').mockReturnValueOnce(
      null as any,
    );

    await expect(
      sut.execute('any_email', 'any_security_key'),
    ).rejects.toThrow();
  });

  test('should throw if security key is invalid', async () => {
    const { sut, securityKeyComparatorAdapter } = makeSut();
    vi.spyOn(securityKeyComparatorAdapter, 'execute').mockReturnValueOnce(
      Promise.resolve(false),
    );

    await expect(
      sut.execute('any_email', 'any_security_key'),
    ).rejects.toThrow();
  });

  test('should throw if forgot password repository throws', async () => {
    const { sut, forgotPasswordRepository } = makeSut();
    vi.spyOn(forgotPasswordRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    await expect(
      sut.execute('any_email', 'any_security_key'),
    ).rejects.toThrow();
  });
});
