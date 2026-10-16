import { faker } from '@faker-js/faker';
import { LoginController } from '../login';
import type { Request, Response } from 'express';
import { InvalidPasswordError, UserNotFoundError } from '../../../errors';

describe('Login Controller', () => {
  class LoginUseCaseStub {
    async execute() {
      return {
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.person.fullName(),
        created_at: faker.date.anytime(),
        updated_at: faker.date.anytime(),
        tokens: {
          accessToken: faker.string.uuid(),
          refreshToken: faker.string.uuid(),
        },
      };
    }
  }

  const makeSut = () => {
    const loginUseCaseStub = new LoginUseCaseStub();
    const sut = new LoginController(loginUseCaseStub);

    return { loginUseCaseStub, sut };
  };

  const baseHttpRequest = {
    body: {
      email: faker.internet.email(),
      password: faker.internet.password(),
      rememberMe: false,
    },
  } as Partial<Request> as Request;

  const makeResponse = () =>
    ({
      cookie: vi.fn(),
    }) as Partial<Response> as Response;

  test('should login successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(baseHttpRequest, makeResponse());

    expect(result.statusCode).toBe(200);
  });

  test('should return 400 if email is empty', async () => {
    const { sut } = makeSut();

    const request = {
      body: {
        email: '',
        password: faker.internet.password(),
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request, makeResponse());

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if email is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      body: {
        email: 'invalid_email',
        password: faker.internet.password(),
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request, makeResponse());

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if password is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      body: {
        email: faker.internet.email(),
        password: '',
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request, makeResponse());

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if password is less than 6 characters', async () => {
    const { sut } = makeSut();

    const request = {
      body: {
        email: faker.internet.email(),
        password: '12345',
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request, makeResponse());

    expect(result.statusCode).toBe(400);
  });

  test('should return 500 if LoginUseCase throws', async () => {
    const { sut, loginUseCaseStub } = makeSut();
    vi.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(new Error());

    const result = await sut.execute(baseHttpRequest, makeResponse());

    expect(result.statusCode).toBe(500);
  });

  test('should return 404 if UserNotFoundError throws', async () => {
    const { sut, loginUseCaseStub } = makeSut();
    vi.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(
      new UserNotFoundError(),
    );

    const result = await sut.execute(baseHttpRequest, makeResponse());

    expect(result.statusCode).toBe(404);
  });

  test('should return 401 if InvalidPasswordError throws', async () => {
    const { sut, loginUseCaseStub } = makeSut();
    vi.spyOn(loginUseCaseStub, 'execute').mockRejectedValueOnce(
      new InvalidPasswordError(),
    );

    const result = await sut.execute(baseHttpRequest, makeResponse());

    expect(result.statusCode).toBe(401);
  });

  test('should set access token maxAge to 15 minutes when rememberMe is false', async () => {
    const { sut } = makeSut();
    const response = makeResponse();

    await sut.execute(baseHttpRequest, response);

    expect(response.cookie).toHaveBeenCalledWith(
      'accessToken',
      expect.any(String),
      expect.objectContaining({ maxAge: 15 * 60 * 1000 }),
    );
  });

  test('should set access token maxAge to 7 days when rememberMe is true', async () => {
    const { sut } = makeSut();
    const response = makeResponse();
    const request = {
      body: { ...baseHttpRequest.body, rememberMe: true },
    } as Partial<Request> as Request;

    await sut.execute(request, response);

    expect(response.cookie).toHaveBeenCalledWith(
      'accessToken',
      expect.any(String),
      expect.objectContaining({ maxAge: 7 * 24 * 60 * 60 * 1000 }),
    );
  });
});
