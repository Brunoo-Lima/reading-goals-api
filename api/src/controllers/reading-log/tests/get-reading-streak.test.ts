import { faker } from '@faker-js/faker';
import type { Request } from 'express';
import { UserNotFoundError } from '../../../errors';
import { GetReadingStreakController } from '../get-reading-streak';

describe('Get Reading Streak Controller', () => {
  class GetReadingStreakUseCaseStub {
    async execute() {
      return { currentStreak: 3, longestStreak: 5 };
    }
  }

  const makeSut = () => {
    const getReadingStreakUseCase = new GetReadingStreakUseCaseStub();

    const sut = new GetReadingStreakController(getReadingStreakUseCase);

    return { sut, getReadingStreakUseCase };
  };

  const baseHttpRequest = {
    params: { userId: faker.string.uuid() },
  } as Partial<Request> as Request;

  test('should get reading streak successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(200);
  });

  test('should return 400 if user ID is invalid', async () => {
    const { sut } = makeSut();

    const result = await sut.execute({
      params: { userId: 'invalid_id' },
    } as Partial<Request> as Request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 404 if UserNotFoundError throws', async () => {
    const { sut, getReadingStreakUseCase } = makeSut();

    vi.spyOn(getReadingStreakUseCase, 'execute').mockRejectedValueOnce(
      new UserNotFoundError(),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(404);
  });

  test('should return 500 if GetReadingStreakUseCase throws', async () => {
    const { sut, getReadingStreakUseCase } = makeSut();

    vi.spyOn(getReadingStreakUseCase, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(500);
  });
});
