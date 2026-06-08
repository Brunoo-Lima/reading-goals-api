import type { Request } from 'express';
import { goal } from '../../../tests';
import { DeleteGoalController } from '../delete-goal';
import { faker } from '@faker-js/faker';
import { GoalNotFoundError } from '../../../errors';

describe('Delete Goal Controller', () => {
  class DeleteGoalUseCaseStub {
    async execute() {
      return goal;
    }
  }

  const makeSut = () => {
    const deleteGoalUseCas = new DeleteGoalUseCaseStub();

    const sut = new DeleteGoalController(deleteGoalUseCas);

    return {
      sut,
      deleteGoalUseCas,
    };
  };

  const baseHttpRequest = {
    params: {
      userId: faker.string.uuid(),
      goalId: faker.string.uuid(),
    },
  } as Partial<Request> as Request;

  test('should delete a goal successfully', async () => {
    const { sut } = makeSut();

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(200);
    expect(httpResponse.body).toEqual(goal);
  });

  test('should return 400 if userId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        ...baseHttpRequest.params,
        userId: 'invalid-uuid',
      },
    } as Partial<Request> as Request;

    const httpResponse = await sut.execute(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 400 if goalId is invalid', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      ...baseHttpRequest,
      params: {
        ...baseHttpRequest.params,
        goalId: 'invalid-uuid',
      },
    } as Partial<Request> as Request;

    const httpResponse = await sut.execute(httpRequest);

    expect(httpResponse.statusCode).toBe(400);
  });

  test('should return 500 if DeleteGoalUseCase throws', async () => {
    const { sut, deleteGoalUseCas } = makeSut();

    vi.spyOn(deleteGoalUseCas, 'execute').mockRejectedValueOnce(new Error());

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(500);
  });

  test('should return 404 if goal not found', async () => {
    const { sut, deleteGoalUseCas } = makeSut();

    vi.spyOn(deleteGoalUseCas, 'execute').mockImplementationOnce(() => {
      throw new GoalNotFoundError();
    });

    const httpResponse = await sut.execute(baseHttpRequest);

    expect(httpResponse.statusCode).toBe(404);
  });
});
