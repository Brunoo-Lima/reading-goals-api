import { faker } from '@faker-js/faker';
import { goal } from '../../../tests';
import type { Request } from 'express';
import { UpdateGoalController } from '../update-goal';
import { ForbiddenError, GoalNotFoundError } from '../../../errors';

describe('Update Goal Controller', () => {
  class UpdateGoalUseCaseStub {
    async execute() {
      return goal;
    }
  }

  const makeSut = () => {
    const updateGoalUseCase = new UpdateGoalUseCaseStub();
    const sut = new UpdateGoalController(updateGoalUseCase);

    return { sut, updateGoalUseCase };
  };

  const baseHttpRequest = {
    params: {
      goalId: faker.string.uuid(),
      userId: faker.string.uuid(),
    },
    query: {
      bookId: faker.string.uuid(),
    },
    body: {
      type: 'DAILY_PAGES',
      target_value: faker.number.int(),
      current_value: 1,
      is_active: true,
      start_date: faker.date.anytime().toISOString(),
    },
  } as Partial<Request> as Request;

  test('should update a goal successfully', async () => {
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
      body: {
        ...baseHttpRequest.body,
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if goal type is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        goalId: faker.string.uuid(),
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
        type: 'invalid_type',
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if goal target value is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        goalId: faker.string.uuid(),
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
        target_value: -1,
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
      body: {
        ...baseHttpRequest.body,
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 400 if goal start date is invalid', async () => {
    const { sut } = makeSut();

    const request = {
      params: {
        goalId: faker.string.uuid(),
        userId: faker.string.uuid(),
      },
      body: {
        ...baseHttpRequest.body,
        start_date: 'invalid_date',
      },
    } as Partial<Request> as Request;

    const result = await sut.execute(request);

    expect(result.statusCode).toBe(400);
  });

  test('should return 403 if ForbiddenError is thrown', async () => {
    const { sut, updateGoalUseCase } = makeSut();
    vi.spyOn(updateGoalUseCase, 'execute').mockRejectedValueOnce(
      new ForbiddenError("You don't have permission to update this goal"),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(403);
  });

  test('should return 404 if goal is not found', async () => {
    const { sut, updateGoalUseCase } = makeSut();
    vi.spyOn(updateGoalUseCase, 'execute').mockRejectedValueOnce(
      new GoalNotFoundError(),
    );

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(404);
  });

  test('should return 500 if UpdateGoalUseCase throws', async () => {
    const { sut, updateGoalUseCase } = makeSut();
    vi.spyOn(updateGoalUseCase, 'execute').mockRejectedValueOnce(new Error());

    const result = await sut.execute(baseHttpRequest);

    expect(result.statusCode).toBe(500);
  });
});
