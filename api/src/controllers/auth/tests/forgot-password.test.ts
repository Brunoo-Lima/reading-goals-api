import type { Request } from 'express';
import { ForgotPasswordController } from '../forgot-password';

describe('Forgot Password Controller', () => {
  class ForgotPasswordUseCaseStub {
    async execute() {
      return;
    }
  }

  const makeSut = () => {
    const forgotPasswordUseCaseStub = new ForgotPasswordUseCaseStub();
    const sut = new ForgotPasswordController(forgotPasswordUseCaseStub);

    return { sut, forgotPasswordUseCaseStub };
  };

  const baseHttpRequest = {
    body: {
      email: 'test@test.com',
      securityKey: 'valid-security-key',
    },
  } as Partial<Request> as Request;

  it('should return 200 on forgot password success', async () => {
    const { sut } = makeSut();

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(200);
  });

  it('should return 400 if email is missing', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        email: undefined,
        securityKey: 'valid-security-key',
      },
    } as Partial<Request> as Request);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if security key is missing', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        email: 'test@test.com',
        securityKey: undefined,
      },
    } as Partial<Request> as Request);

    expect(response.statusCode).toBe(400);
  });

  it('should return 400 if email is invalid', async () => {
    const { sut } = makeSut();

    const response = await sut.execute({
      body: {
        email: 'invalid-email',
        securityKey: 'valid-security-key',
      },
    } as Partial<Request> as Request);

    expect(response.statusCode).toBe(400);
  });

  it('should return 500 if ForgotPasswordUseCase throws', async () => {
    const { sut, forgotPasswordUseCaseStub } = makeSut();
    vi.spyOn(forgotPasswordUseCaseStub, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const response = await sut.execute(baseHttpRequest);

    expect(response.statusCode).toBe(500);
  });
});
