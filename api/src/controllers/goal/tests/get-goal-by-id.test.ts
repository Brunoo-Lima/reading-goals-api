import { faker } from '@faker-js/faker';
import { goal } from '../../../tests';
import { GetGoalByIdController } from '../get-goal-by-id';
import type { Request } from 'express';
import { GoalNotFoundError } from '../../../errors';

describe('Get Goal By ID Controller', () => {
  class GetGoalByIdUseCaseStub {
    async execute() {
      return goal;
    }
  }

  const makeSut = () => {
    const getGoalByIdUseCase = new GetGoalByIdUseCaseStub();
    const sut = new GetGoalByIdController(getGoalByIdUseCase);

    return {
      sut,
      getGoalByIdUseCase,
    };
  };

  const baseHttpRequest = {
    params: {
      goalId: faker.string.uuid(),
      userId: faker.string.uuid(),
    },
  } as Partial<Request> as Request;

  test('should get a goal by ID successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(200);
    expect(result.body).toEqual(goal);
  });

  test('should return 400 if goal ID is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        goalId: 'invalid_id',
        userId: faker.string.uuid(),
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if user ID is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        goalId: faker.string.uuid(),
        userId: 'invalid_id',
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 404 if goal is not found', async () => {
    const { sut, getGoalByIdUseCase } = makeSut();

    vi.spyOn(getGoalByIdUseCase, 'execute').mockRejectedValueOnce(
      new GoalNotFoundError(),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(404);
  });

  test('should return 500 if GetGoalByIdUseCase throws', async () => {
    const { sut, getGoalByIdUseCase } = makeSut();

    vi.spyOn(getGoalByIdUseCase, 'execute').mockRejectedValueOnce(new Error());

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(500);
  });
});
