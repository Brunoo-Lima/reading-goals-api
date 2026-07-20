import { UnauthorizedError } from '../../../errors';
import { RefreshTokenUseCase } from '../refresh-token';

describe('Refresh Token Use Case', () => {
  class TokensGeneratorAdapterStub {
    execute() {
      return {
        accessToken: 'any_access_token',
        refreshToken: 'any_refresh_token',
      };
    }
  }

  class TokenVerifierAdapterStub {
    execute() {
      return {
        userId: 'any_user_id',
        rememberMe: true,
      };
    }
  }

  const makeSut = () => {
    const tokensGeneratorAdapterStub = new TokensGeneratorAdapterStub();
    const tokenVerifierAdapterStub = new TokenVerifierAdapterStub();
    const sut = new RefreshTokenUseCase(
      tokensGeneratorAdapterStub,
      tokenVerifierAdapterStub,
    );

    return {
      sut,
      tokensGeneratorAdapterStub,
      tokenVerifierAdapterStub,
    };
  };

  test('should return new tokens', async () => {
    const { sut } = makeSut();
    const refreshToken = 'any_refresh_token';

    const result = await sut.execute(refreshToken);

    expect(result).toEqual({
      accessToken: 'any_access_token',
      refreshToken: 'any_refresh_token',
    });
  });

  test('should preserve rememberMe when refreshing tokens', async () => {
    const { sut, tokensGeneratorAdapterStub } = makeSut();
    const executeSpy = vi.spyOn(tokensGeneratorAdapterStub, 'execute');

    await sut.execute('any_refresh_token');

    expect(executeSpy).toHaveBeenCalledWith('any_user_id', true);
  });

  test('should throw if TokensVerifierAdapter throws', async () => {
    const { sut, tokenVerifierAdapterStub } = makeSut();
    vi.spyOn(tokenVerifierAdapterStub, 'execute').mockReturnValueOnce(
      null as any,
    );

    const promise = sut.execute('any_refresh_token');

    await expect(promise).rejects.toThrow(new UnauthorizedError());
  });
});
