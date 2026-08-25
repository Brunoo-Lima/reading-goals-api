import type { Request } from 'express';
import { ExpiredTokenError, InvalidTokenError } from '../../../errors';
import { ResetPasswordController } from '../reset-password';

describe('Reset Password Controller', () => {
  class ResetPasswordUseCaseStub {
    async execute() {}
  }

  const makeSut = () => {
    const resetPasswordUseCaseStub = new ResetPasswordUseCaseStub();
    const sut = new ResetPasswordController(resetPasswordUseCaseStub);

    return { sut, resetPasswordUseCaseStub };
  };

  const baseHttpRequest = {
    body: {
      token: 'valid_token',
      password: 'new_password',
    },
  } as Partial<Request> as Request;

  it('should return 200 on reset password success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(baseHttpRequest.body);

    expect(response.statusCode).toBe(200);
  });

  it('should return 400 if token is missing', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...baseHttpRequest.body,
        token: undefined,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if token is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...baseHttpRequest,
      body: {
        ...baseHttpRequest.body,
        token: 123,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if password is missing', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      ...baseHttpRequest,
      body: {
        ...baseHttpRequest.body,
        password: undefined,
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if password is less than 6 characters', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        ...baseHttpRequest.body,
        password: '12345',
      },
    } as any);

    expect(response.statusCode).toBe(400);
  });

  it('should return 500 if ResetPasswordUseCase throws', async () => {
    const { sut, resetPasswordUseCaseStub } = makeSut();
    vi.spyOn(resetPasswordUseCaseStub, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const response = await sut.execute(baseHttpRequest.body);

    expect(response.statusCode).toBe(500);
  });

  it('should return 400 if InvalidTokenError is thrown', async () => {
    const { sut, resetPasswordUseCaseStub } = makeSut();
    vi.spyOn(resetPasswordUseCaseStub, 'execute').mockRejectedValueOnce(
      new InvalidTokenError(),
    );

    const response = await sut.execute(baseHttpRequest.body);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if ExpiredTokenError is thrown', async () => {
    const { sut, resetPasswordUseCaseStub } = makeSut();
    vi.spyOn(resetPasswordUseCaseStub, 'execute').mockRejectedValueOnce(
      new ExpiredTokenError(),
    );

    const response = await sut.execute(baseHttpRequest.body);

    expect(response.statusCode).toBe(400);
  });
});
