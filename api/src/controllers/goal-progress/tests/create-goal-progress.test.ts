import { faker } from '@faker-js/faker';
import type { Request } from 'express';
import { CreateGoalProgressController } from '../create-goal-progress';
import {
  ForbiddenError,
  GoalNotFoundError,
  GoalProgressExceedsTargetError,
} from '../../../errors';

describe('Create Goal Progress Controller', () => {
  class CreateGoalProgressUseCaseStub {
    async execute() {
      return {
        id: faker.string.uuid(),
        goal_id: faker.string.uuid(),
        value: 10,
      };
    }
  }

  const makeSut = () => {
    const createGoalProgressUseCase = new CreateGoalProgressUseCaseStub();
    const sut = new CreateGoalProgressController(createGoalProgressUseCase);
    return { sut, createGoalProgressUseCase };
  };

  const baseHttpRequest = {
    params: {
      goalId: faker.string.uuid(),
      userId: faker.string.uuid(),
    },
    body: { value: 10 },
  } as Partial<Request> as Request;

  test('should create goal progress successfully', async () => {
    const { sut } = makeSut();
    const result = await sut.execute(baseHttpRequest);
    expect(result.statusCode).toBe(201);
  });

  test('should return 400 if goal ID is invalid', async () => {
    const { sut } = makeSut();
    const request = {
      ...baseHttpRequest,
      params: { ...baseHttpRequest.params, goalId: 'invalid_id' },
    } as Request;
    const result = await sut.execute(request);
    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if progress data is invalid', async () => {
    const { sut } = makeSut();
    const request = {
      ...baseHttpRequest,
      body: { value: 0 },
    } as Request;
    const result = await sut.execute(request);
    expect(result.statusCode).toBe(400);
  });

  test('should return 404 if GoalNotFoundError is thrown', async () => {
    const { sut, createGoalProgressUseCase } = makeSut();
    vi.spyOn(createGoalProgressUseCase, 'execute').mockRejectedValueOnce(
      new GoalNotFoundError(),
    );
    const result = await sut.execute(baseHttpRequest);
    expect(result.statusCode).toBe(404);
  });

  test('should return 403 if ForbiddenError is thrown', async () => {
    const { sut, createGoalProgressUseCase } = makeSut();
    vi.spyOn(createGoalProgressUseCase, 'execute').mockRejectedValueOnce(
      new ForbiddenError('Forbidden'),
    );
    const result = await sut.execute(baseHttpRequest);
    expect(result.statusCode).toBe(403);
  });

  test('should return 400 if progress exceeds goal target', async () => {
    const { sut, createGoalProgressUseCase } = makeSut();
    vi.spyOn(createGoalProgressUseCase, 'execute').mockRejectedValueOnce(
      new GoalProgressExceedsTargetError(),
    );
    const result = await sut.execute(baseHttpRequest);
    expect(result.statusCode).toBe(400);
  });

  test('should return 500 if CreateGoalProgressUseCase throws', async () => {
    const { sut, createGoalProgressUseCase } = makeSut();
    vi.spyOn(createGoalProgressUseCase, 'execute').mockRejectedValueOnce(
      new Error(),
    );
    const result = await sut.execute(baseHttpRequest);
    expect(result.statusCode).toBe(500);
  });
});
