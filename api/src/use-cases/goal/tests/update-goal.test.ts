import { faker } from '@faker-js/faker';
import { GoalNotFoundError } from '../../../errors';
import { goal } from '../../../tests';
import { UpdateGoalUseCase } from '../update-goal';

describe('Update Goal Use Case', () => {
  class UpdateGoalRepositoryStub {
    async execute() {
      return goal;
    }
  }

  class GetGoalByIdRepositoryStub {
    async execute() {
      return goal;
    }
  }

  const makeSut = () => {
    const updateGoalRepository = new UpdateGoalRepositoryStub();
    const getGoalByIdRepository = new GetGoalByIdRepositoryStub();
    const sut = new UpdateGoalUseCase(
      updateGoalRepository,
      getGoalByIdRepository,
    );

    return { sut, updateGoalRepository, getGoalByIdRepository };
  };

  test('should update a goal successfully', async () => {
    const { sut } = makeSut();

    const result = await sut.execute(goal.id, goal);

    expect(result).toEqual(goal);
  });

  test('should return GoalNotFoundError if goal is not found', async () => {
    const { sut, getGoalByIdRepository } = makeSut();
    vi.spyOn(getGoalByIdRepository, 'execute').mockResolvedValueOnce(
      null as any,
    );

    const goalId = faker.string.uuid();

    const promise = sut.execute(goalId, goal);

    await expect(promise).rejects.toThrow(new GoalNotFoundError(goalId));
  });

  test("should return ForbiddenError if user doesn't have permission", async () => {
    const { sut } = makeSut();

    const promise = sut.execute(goal.id, {
      ...goal,
      user_id: faker.string.uuid(),
    });

    await expect(promise).rejects.toThrow();
  });

  test('should throw if GetGoalByIdRepository throws', async () => {
    const { sut, getGoalByIdRepository } = makeSut();
    vi.spyOn(getGoalByIdRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(goal.id, goal);

    await expect(promise).rejects.toThrow();
  });

  test('should throw if UpdateGoalRepository throws', async () => {
    const { sut, updateGoalRepository } = makeSut();
    vi.spyOn(updateGoalRepository, 'execute').mockRejectedValueOnce(
      new Error(),
    );

    const promise = sut.execute(goal.id, goal);

    await expect(promise).rejects.toThrow();
  });
});
